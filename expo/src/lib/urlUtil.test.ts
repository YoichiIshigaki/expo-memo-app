import { isEncodedUrl, textToLink } from './urlUtil';

const text1 = 'https://www.google.com aaa';
const text2 = `https://www.google.com aaa
テスト
http://www.google.com?q=漢字
aaahttps://www.google.com?q=%E6%BC%A2%E5%AD%97`;

describe('test textToLink', () => {
  test('textToLink oneline', () => {
    expect(textToLink(text1)).toStrictEqual([
      { text: 'https://www.google.com', isLink: true },
      { text: ' aaa', isLink: false },
    ]);
  });
  test('textToLink multiline', () => {
    expect(textToLink(text2)).toStrictEqual([
      { text: 'https://www.google.com', isLink: true },
      { text: ' aaa\nテスト\n', isLink: false },
      { text: 'http://www.google.com?q=漢字', isLink: true },
      { text: '\naaa', isLink: false },
      { text: 'https://www.google.com?q=%E6%BC%A2%E5%AD%97', isLink: true },
    ]);
  });
});

describe('test isEncodeUrl', () => {
  test('isEncodeUrl false', () => {
    expect(isEncodedUrl('https://google.com')).toBeFalsy();
    expect(isEncodedUrl('https://google.com?q=あああ')).toBeFalsy();
  });
  test('isEncodeUrl true', () => {
    expect(
      isEncodedUrl('https://www.google.com?q=%E3%81%82%E3%81%82%E3%81%82'),
    ).toBeTruthy();
  });
});
