import { PublishSubscribe } from '../src/utils/PublishSubscribe';

const ps = new PublishSubscribe();

function func1(params) {
  console.log('%c Line:6 🍕 params', 'color:#42b983', params);
}

ps.addEventListener('eventa', func1);

console.log('%c Line:11 🎂 ps', 'color:#fca650', ps);

setTimeout(() => {
  ps.dispatchEvent('eventa', { eventa: 'eventa' });
}, 1000);

setTimeout(() => {
  ps.removeEventListener('eventa', func1);
  console.log('%c Line:19 🥚 ps', 'color:#465975', ps);
}, 5000);
