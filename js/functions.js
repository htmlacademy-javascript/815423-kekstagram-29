const result = (a, b) => {
  const l = a.length <= b;
  return l;
};

result('Проверяемая строка', 10);

const isPalindrome = (text) => {
  text = text.toLowerCase().replaceAll('','');
  return text === text.split('').reverse().join('');
};

isPalindrome('топот и довод');

const moreNumbers = (text) => {
  text = parseInt(String(text.replace(/\D/g, '')), 10);
};
moreNumbers('helloo 2023');
