import React, {useState} from 'react';
import {
  Input,
  Center,
  Heading,
  NativeBaseProvider,
  ScrollView,
  StatusBar,
  Button,
  Text,
} from 'native-base';
import Cnf from './Cnf';
import InputBox from './Inputbox';
const Main = () => {
  const [lines, setLines] = useState(3);
  const [lang, setLang] = useState({});
  const [display, setDisplay] = useState({});
  return (
    <ScrollView backgroundColor="#0c0c0f">
      <StatusBar />
      <Center>
        <Heading textAlign="center" mb="10">
          TOC CALCULATOR
        </Heading>
      </Center>

      <Input
        variant="outline"
        placeholder="No of lines"
        color="white"
        onEndEditing={lines => {
          if (!parseInt(lines.nativeEvent.text)) setLines(1);
          else setLines(parseInt(lines.nativeEvent.text));
        }}
      />

      {[...Array.from(Array(lines).keys())].map(i => (
        <InputBox key={i} lang={lang} setLang={setLang} />
      ))}
      <Button
        variant="outline"
        onPress={() => {
          setDisplay(Cnf(lines, lang));
        }}>
        Enter
      </Button>
      <Text>{JSON.stringify(display, null, 2)}</Text>
    </ScrollView>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Main />
    </NativeBaseProvider>
  );
};
