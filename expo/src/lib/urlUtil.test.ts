import { textToLink } from './urlUtil';

const text = `https://www.google.com aaa
http://www.google.com aaa
dndvdfjk
https://www.google.com?q=漢字
aaa https://www.google.com?q=あああ
aaahttps://www.google.com?q=あああ aaa
https://www.google.com?q=aaa aaa`;

const text2 = 'https://www.google.com aaa';

test('link assertion', () => {
  // 期待する結果を `expect` を使って指定します。
  expect(textToLink(text2)).toStrictEqual([
    { text: 'https://www.google.com', link: true },
    { text: ' aaa', link: false },
  ]);
});
