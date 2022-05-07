export default (lines, lang) => {
  let epselonFound = '';
  let mapVariableProduction = JSON.parse(JSON.stringify(lang));

  const insertNewStartSymbol = () => {
    mapVariableProduction['S0'] = ['S'];
  };

  const eliminateEpselon = () => {
    for (let i = 0; i < lines; i++) removeEpselon();
  };

  const removeEpselon = () => {
    for (let i in mapVariableProduction) {
      let productionRow = mapVariableProduction[i].indexOf('e');
      if (productionRow > 0 && mapVariableProduction[i].length > 1) {
        mapVariableProduction[i].splice(productionRow, 1);
        epselonFound = i;
      } else if (productionRow == 0) {
        epselonFound = i;
        delete mapVariableProduction[i];
      }
    }

    for (let k in mapVariableProduction) {
      let productionList = mapVariableProduction[k];
      for (let i = 0; i < productionList.length; i++) {
        let temp = productionList[i];
        for (let j = 0; j < temp.length; j++) {
          if (epselonFound == temp[j]) {
            temp = temp.replace(epselonFound, () => {
              if (temp.length == 1) return 'e';
              else return '';
            });

            if (!productionList.includes(temp)) {
              productionList.push(temp);
            }
          }
        }
      }
    }
  };
  const removeDuplicateKeyValue = () => {
    for (let i in mapVariableProduction) {
      let productionRow = mapVariableProduction[i];
      for (let j = 0; j < productionRow.length; j++) {
        if (i == productionRow[j]) {
          const index = j;
          if (index > -1) {
            productionRow.splice(index, 1);
          }
        }
      }
    }
  };
  const removeSingleVariable = () => {
    let set = [];
    for (let i in mapVariableProduction) {
      set.push(i);
    }
    for (let i in mapVariableProduction) {
      let productionList = mapVariableProduction[i];
      for (let j = 0; j < productionList.length; j++) {
        let temp = productionList[j];
        for (let k = 0; k < set.length; k++) {
          if (set[k] == temp) {
            const index = j;
            if (index > -1) {
              productionList.splice(index, 1);
            }
            productionList.push(...mapVariableProduction[set[k]]);
          }
        }
      }
    }
  };

  const eliminateSingleVariable = () => {
    for (let i = 0; i < lines; i++) removeSingleVariable();
  };

  const onlyTwoTermnalandOneVariable = () => {
    let set = [];
    let tempList = {};
    for (let i in mapVariableProduction) {
      set.push(i);
    }
    let key = null;
    let asciiBegin = 71;
    for (let i in mapVariableProduction) {
      let found1 = false;
      let found2 = false;
      let found = false;

      let productionList = mapVariableProduction[i];
      for (let j = 0; j < productionList.length; j++) {
        let temp = productionList[i];
        for (let k = 0; k < temp.length; k++) {
          if (temp.length == 3) {
            let newProduction = temp.substring(1, 3);
            if (
              checkDuplicateInProductionList(tempList, newProduction) &&
              checkDuplicateInProductionList(
                mapVariableProduction,
                newProduction,
              )
            ) {
              found = true;
            } else {
              found = false;
            }
            if (found) {
              tempList[String.fromCharCode(asciiBegin)] = [newProduction];
            }
          } else if (temp.length == 2) {
            for (let l = 0; l < set.length; l++) {
              if (set[l] == productionList[j][k]) {
                found = false;
              } else {
                found = true;
                break;
              }
            }
            if (!found) {
            }
          }
        }
      }
    }
  };

  let checkDuplicateInProductionList = (map, key) => {
    let notFound = true;
    for (let i in map) {
      let productionList = map[i];
      for (let j = 0; j < productionList.length; j++) {
        if (key == productionList[j]) {
          return false;
        } else {
          notFound = true;
        }
      }
    }
    return notFound;
  };

  const run = () => {
    insertNewStartSymbol();
    console.log(mapVariableProduction);
    eliminateEpselon();
    console.log(mapVariableProduction);
    removeDuplicateKeyValue();
    console.log(mapVariableProduction);
    eliminateSingleVariable();
    console.log(mapVariableProduction);
    return mapVariableProduction;
  };
  return run();
};
