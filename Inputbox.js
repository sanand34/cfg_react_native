import React, {useState} from 'react';
import {
  Input,
  Center,
  Button,
  HStack,
  Text,
  View,
  ScrollView,
} from 'native-base';
export default ({lang, setLang}) => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState();
  const [elements, setelements] = useState([]);
  const [check, setCheck] = useState(false);

  return (
    <Center>
      <ScrollView horizontal={true}>
        <HStack alignItems="center" mb="8">
          <Input
            variant="outline"
            placeholder=""
            color="white"
            onEndEditing={text => {
              setStart(text.nativeEvent.text);
              setCheck(false);
            }}
          />

          <Text color="white">
            {'   '}--&gt; {'   '}
          </Text>

          <Input
            variant="outline"
            placeholder=""
            color="white"
            onEndEditing={text => {
              let newArr = [...elements];
              newArr[0] = text.nativeEvent.text;
              setelements(newArr);
              setCheck(false);
            }}
          />

          {[...Array.from(Array(count).keys())].map(i => (
            <View alignItems="center" flexDirection="row" key={i}>
              <Text color="white">
                {'   '}|{'   '}
              </Text>
              <Input
                variant="outline"
                placeholder=""
                color="white"
                onEndEditing={text => {
                  let newArr = [...elements];
                  newArr[i + 1] = text.nativeEvent.text;
                  setelements(newArr);
                  setCheck(false);
                }}
              />
            </View>
          ))}
          <Text color="white">
            {'   '}|{'   '}
          </Text>

          <Button
            variant="outline"
            onPress={() => {
              setCount(count + 1);
              setCheck(false);
            }}>
            +
          </Button>
          <Text color="white">
            {'   '} {'   '}
          </Text>
          <Button
            variant={check ? 'solid' : 'outline'}
            onPress={() => {
              let string = start + '->';
              for (let i = 0; i < elements.length - 1; i++) {
                string += elements[i] + '|';
              }
              string += elements[elements.length - 1];
              setCheck(true);
              console.log(string);
              let newObj = {...lang};
              newObj[start] = elements;
              setLang(newObj);
            }}>
            _/
          </Button>
        </HStack>
      </ScrollView>
    </Center>
  );
};
