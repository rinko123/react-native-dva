/**
 * 主要的业务逻辑
 */

export function fetchHomeName() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('brotherWang1234 <-- 点我')
    }, 1000);
  });
}