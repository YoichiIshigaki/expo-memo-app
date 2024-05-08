import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { isEncodedUrl, textToLink } from 'src/lib/urlUtil';
import React from 'react';

const styles = StyleSheet.create({
  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
  isLinkText: {
    color: '#467FD3',
    textDecorationLine: 'underline',
  },
});

const handlePressButtonAsync = async (url: string): Promise<void> => {
  await WebBrowser.openBrowserAsync(url);
};

const generateHref = ({
  text,
  isLink,
}: {
  text: string;
  isLink: boolean;
}): string | null =>
  isLink && isEncodedUrl(text) ? text : isLink ? encodeURI(text) : null;

type TextWithLinkProps = ReturnType<typeof textToLink>[number] & {
  href: string | null;
};

const TextWithLink: React.FC<TextWithLinkProps> = ({ text, isLink, href }) => {
  const handlePress = async (): Promise<void> => {
    if (isLink && href) {
      await handlePressButtonAsync(href);
    }
  };

  return (
    <>
      {isLink ? (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.isLinkText}>{text}</Text>
        </TouchableOpacity>
      ) : (
        <Text>{text}</Text>
      )}
    </>
  );
};

type TextBodyViewWithLinkProps = { textBody: string };

export const TextBodyViewWithLink: React.FC<TextBodyViewWithLinkProps> = ({
  textBody,
}) => {
  const separatedTexts = textBody
    .split('\n')
    .map((line) => {
      const lineTexts = textToLink(line).map((v) => ({
        ...v,
        href: generateHref(v),
      }));
      // Add an empty string at the end to ensure newline
      if (lineTexts.length > 0) {
        lineTexts.push({ text: '', isLink: false, href: null });
      }
      return lineTexts;
    })
    .flat();

  return (
    <View style={styles.memoBodyText}>
      {separatedTexts.map((textObject, index) => (
        <TextWithLink key={index} {...textObject} />
      ))}
    </View>
  );
};
