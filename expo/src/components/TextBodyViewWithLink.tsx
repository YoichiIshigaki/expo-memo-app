import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { textToLink } from 'src/lib/urlUtil';
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
  linkText: {
    color: '#467FD3',
    textDecorationLine: 'underline',
  },
});

const handlePressButtonAsync = async (url: string): Promise<void> => {
  await WebBrowser.openBrowserAsync(url);
};

type TextWithLinkProps = ReturnType<typeof textToLink>[number];

const TextWithLink: React.FC<TextWithLinkProps> = ({ text, link }) => {
  const handlePress = async (): Promise<void> => {
    if (link) {
      await handlePressButtonAsync(text);
    }
  };

  return (
    <>
      {link ? (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.linkText}>{text}</Text>
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
      const lineTexts = textToLink(line);
      // Add an empty string at the end to ensure newline
      if (lineTexts.length > 0) lineTexts.push({ text: '', link: false });
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
