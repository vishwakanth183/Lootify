// // input :
// // let variant1 = {"colors" : ["Yellow", "white chocolate", "Green"]};
// // let variant2 = {"size" : ["Small", "Medium", "Large"]};

import { optionItem } from "../../options/optionsList/optionsListComponent";

// import { optionItem } from "../../options/optionsList/optionsListComponent";

// // output : {
// //   'Yellow,Small',
// //   'Yellow,Medium',
// //   'Yellow,Large',
// //   'white chocolate,Small',
// //   'white chocolate,Medium',
// //   'white chocolate,Large',
// //   'Green,Small',
// //   'Green,Medium',
// //   'Green,Large'
// // }

// let dynamicArray : optionItem[]= []

// let variant1 = {"colors" : ["Yellow", "white chocolate", "Green"]};
// let variant2 = {"size" : ["Small", "Medium", "Large"]};
// let variant3 = {"mode" : ["College","Travel"]};

// // dynamicArray = [variant1 ,variant2,variant3]

// const generate_all_combo = (dynamicArray : optionItem[]) =>{

//     let unique_set = new Set();

//    function recursive_combo(currentArray : any[], currentIndex : number){
//        if(currentIndex==dynamicArray.length)
//        {
//            unique_set.add(currentArray.join(','));
//            return
//        }

//        let loopArray : optionItem[] = dynamicArray[currentIndex]
//        let loopValue : optionItem = Object.keys(dynamicArray[currentIndex])[0]
//       for(const item of loopArray[loopValue])
//       {
//           recursive_combo([...currentArray,item],currentIndex+1);
//       }
//    }

//    recursive_combo([],0)

//    console.log(unique_set)

// }

// generate_all_combo()

interface optionValueItem {
  id: number;
  value: string;
}

export interface comboItem {
  value: optionValueItem[];
}

export const optionCombo = (selectedOptionArray: optionItem[]) => {
  //   console.log("optionArray", optionArray);
  let unique_set = new Set();

  function recursive_variant(currentCombinationArray: optionValueItem[], currentIndex: number) {
    if (currentCombinationArray.length == selectedOptionArray.length) {
      unique_set.add(currentCombinationArray);
      return;
    }

    let currentOption = selectedOptionArray[currentIndex];
    let currentOptionValues = selectedOptionArray[currentIndex]?.optionValues;

    // console.log("currentOption", currentOption);
    // console.log("currentOptionValue", currentOptionValues);

    for (let i = 0; i < currentOptionValues?.length; i++) {
      // console.log(currentOptionValues[i]);
      recursive_variant([...currentCombinationArray, currentOptionValues[i]], currentIndex + 1);
    }

    // for (const item of currentOption.optionValues) {
    //   recursive_variant([...currentCombinationArray, item], currentIndex + 1);
    // }
  }
  if (selectedOptionArray.length) {
    recursive_variant([], 0);
  }
  //   console.log(unique_set);

  return Array.from(unique_set);
};
