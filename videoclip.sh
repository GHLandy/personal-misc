#!/bin/bash

# 用法说明函数
usage() {
    echo "用法: $0 [-c 配置文件] [-o 输出目录] [-d]"
    echo ""
    echo "选项:"
    echo "  -c, --config FILE  指定配置文件路径 (默认: clip_config.txt)"
    echo "  -o, --output DIR   指定输出目录 (默认: ./output)"
    echo "  -d, --dry-run      只显示将要执行的操作，不实际运行"
    echo "  -h, --help         显示此帮助信息"
    echo ""
    echo "配置文件格式:"
    echo "  输入文件|起始时间|结束时间|输出文件名(可选)"
    echo "  示例1: /path/to/video.mp4|00:00:10|00:01:30"
    echo "  示例2: /path/to/video.mp4|00:00:10|00:01:30|custom_name.mp4"
    echo "  如果只指定前三个参数，输出文件名将与输入文件名相同"
    exit 1
}

# 默认配置
CONFIG_FILE="clip_config.txt"
OUTPUT_DIR="./output"
DRY_RUN=false

# 解析命令行参数
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--config)
            CONFIG_FILE="$2"
            shift 2
            ;;
        -o|--output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -h|--help)
            usage
            ;;
        *)
            echo "未知参数: $1"
            usage
            ;;
    esac
done

# 检查配置文件是否存在
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "错误: 配置文件 '$CONFIG_FILE' 不存在"
    echo ""
    echo "请创建配置文件，格式如下:"
    echo "# 每行格式: 输入文件|起始时间|结束时间|输出文件名(可选)"
    echo "# 如果不指定输出文件名，将使用输入文件名"
    echo ""
    echo "# 示例:"
    echo "/path/to/video.mp4|00:00:10|00:01:30"
    echo "/path/to/another.mp4|30|45|my_custom_name.mp4"
    echo "# 注释以 # 开头"
    exit 1
fi

# 检查ffmpeg是否安装
if ! command -v ffmpeg &> /dev/null; then
    echo "错误: ffmpeg 未安装"
    echo "请先安装 ffmpeg:"
    echo "  Ubuntu/Debian: sudo apt install ffmpeg"
    echo "  macOS: brew install ffmpeg"
    echo "  CentOS/RHEL: sudo yum install ffmpeg"
    exit 1
fi

# 创建输出目录
if [[ "$DRY_RUN" = false ]]; then
    mkdir -p "$OUTPUT_DIR"
    if [[ $? -ne 0 ]]; then
        echo "错误: 无法创建输出目录 $OUTPUT_DIR"
        exit 1
    fi
fi

# 计数器
TOTAL=0
SUCCESS=0
FAILED=0
SKIPPED=0
CLIP_COUNTER=0

echo "=============================================="
echo "开始批量切割MP4文件"
echo "配置文件: $CONFIG_FILE"
echo "输出目录: $OUTPUT_DIR"
echo "=============================================="
echo ""

# 用于处理文件名冲突
declare -A FILE_COUNT

# 读取配置文件
while IFS= read -r line || [[ -n "$line" ]]; do
    # 跳过空行和注释
    if [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]]; then
        continue
    fi

    TOTAL=$((TOTAL + 1))
    CLIP_COUNTER=$((CLIP_COUNTER + 1))

    # 解析行: 输入文件|起始时间|结束时间|输出文件名(可选)
    IFS='|' read -r input_file start_time end_time output_name <<< "$line"

    # 去除可能的前后空格
    input_file=$(echo "$input_file" | xargs)
    start_time=$(echo "$start_time" | xargs)
    end_time=$(echo "$end_time" | xargs)
    output_name=$(echo "$output_name" | xargs)

    # 验证必填字段
    if [[ -z "$input_file" || -z "$start_time" || -z "$end_time" ]]; then
        echo "[错误] 行 $TOTAL: 缺少必要字段"
        echo "  行内容: $line"
        FAILED=$((FAILED + 1))
        CLIP_COUNTER=$((CLIP_COUNTER - 1))
        continue
    fi

    # 检查输入文件是否存在
    if [[ ! -f "$input_file" ]]; then
        echo "[错误] 行 $TOTAL: 输入文件不存在"
        echo "  输入文件: $input_file"
        FAILED=$((FAILED + 1))
        CLIP_COUNTER=$((CLIP_COUNTER - 1))
        continue
    fi

    # 确定输出文件名
    if [[ -z "$output_name" ]]; then
        # 如果没有指定输出文件名，使用输入文件名
        input_basename=$(basename "$input_file")
        output_name="$input_basename"
    fi

    # 确保输出文件名在输出目录中是唯一的
    output_file="$OUTPUT_DIR/$output_name"
    if [[ -e "$output_file" && "$DRY_RUN" = false ]]; then
        # 如果文件已存在，添加序号
        base_name="${output_name%.*}"
        extension="${output_name##*.}"
        count=1

        while [[ -e "$output_file" ]]; do
            if [[ "$base_name" != "$extension" ]]; then
                # 有扩展名的情况
                output_name="${base_name}_${count}.${extension}"
            else
                # 无扩展名的情况
                output_name="${base_name}_${count}"
            fi
            output_file="$OUTPUT_DIR/$output_name"
            count=$((count + 1))
        done
        echo "[注意] 输出文件已存在，重命名为: $output_name"
    fi

    # 计算时间
    start_seconds=$(awk -F':' '{
        if (NF == 3) {print $1 * 3600 + $2 * 60 + $3}
        else if (NF == 2) {print $1 * 60 + $2}
        else {print $1}
    }' <<< "$start_time")

    end_seconds=$(awk -F':' '{
        if (NF == 3) {print $1 * 3600 + $2 * 60 + $3}
        else if (NF == 2) {print $1 * 60 + $2}
        else {print $1}
    }' <<< "$end_time")

    actual_duration=$(echo "$end_seconds - $start_seconds" | bc 2> /dev/null || echo "N/A")

    echo "=============================================="
    echo "处理 [$CLIP_COUNTER]: $(basename "$input_file")"
    echo "输入文件: $input_file"
    echo "起始时间: $start_time (${start_seconds}秒)"
    echo "结束时间: $end_time (${end_seconds}秒)"
    if [[ "$actual_duration" != "N/A" ]]; then
        echo "持续时间: ${actual_duration}秒"
    fi
    echo "输出文件: $output_name"

    if [[ "$DRY_RUN" = true ]]; then
        echo "[试运行] 将执行:"
        echo "  ffmpeg -i \"$input_file\" -ss $start_time -to $end_time -c:v copy -c:a copy \"$output_file\""
        SKIPPED=$((SKIPPED + 1))
    else
        echo "正在处理..."

        # 执行ffmpeg命令
        ffmpeg -i "$input_file" -ss "$start_time" -to "$end_time" \
               -c:v copy -c:a copy -y "$output_file" 2>> clip_err.log

        if [[ $? -eq 0 ]]; then
            # 检查输出文件是否创建成功
            if [[ -f "$output_file" ]]; then
                output_size=$(du -h "$output_file" 2> /dev/null | cut -f1 || echo "未知")
                echo "[成功] 输出文件已创建: $output_name (大小: ${output_size})"
                SUCCESS=$((SUCCESS + 1))
            else
                echo "[错误] 输出文件未创建"
                FAILED=$((FAILED + 1))
            fi
        else
            echo "[错误] ffmpeg处理失败"
            # 显示部分错误信息
            if [[ -f clip_err.log ]]; then
                tail -5 clip_err.log
            fi
            FAILED=$((FAILED + 1))
        fi
    fi
    echo ""
done < "$CONFIG_FILE"

# 清理临时文件
if [[ -f clip_err.log ]]; then
    rm clip_err.log
fi

echo "=============================================="
echo "处理完成！"
echo "配置文件行数: $TOTAL 行"
echo "有效任务数: $CLIP_COUNTER 个"
if [[ "$DRY_RUN" = true ]]; then
    echo "试运行: $SKIPPED 个任务（未实际执行）"
else
    echo "成功: $SUCCESS 个"
    echo "失败: $FAILED 个"
    echo "输出目录: $OUTPUT_DIR"

    # 显示输出目录内容
    if [[ $SUCCESS -gt 0 ]]; then
        echo ""
        echo "生成的剪辑文件:"
        ls -lh "$OUTPUT_DIR/" 2> /dev/null | head -20
        if [[ $(ls -1 "$OUTPUT_DIR/" 2> /dev/null | wc -l) -gt 20 ]]; then
            echo "... 更多文件"
        fi
    fi
fi
echo "=============================================="
