import Toast from "react-native-root-toast";
import { createAction } from "../utils";

export default {
  namespace: "rinko",
  state: {
    words: [
      {
        groupId: 1,
        word: "アサ先生",
        alias: "アサせんせい",
        tone: "0",
        mean: "阿佐老师",
        id: 1,
        familiar: true,
        spell: "azls11"
      },
      {
        groupId: 2,
        word: "アサ先生21",
        alias: "アサせんせい21",
        tone: "1",
        mean: "阿佐老师21",
        id: 2,
        familiar: true,
        spell: "azls21"
      },
      {
        groupId: 2,
        word: "アサ先生22",
        alias: "アサせんせい22",
        tone: "2",
        mean: "阿佐老师22",
        id: 3,
        familiar: true,
        spell: "azls22"
      },

      {
        groupId: 3,
        word: "アサ先生31",
        alias: "アサせんせい31",
        tone: "3",
        mean: "阿佐老师31",
        id: 4,
        familiar: true,
        spell: "azls31"
      },
      {
        groupId: 3,
        word: "アサ先生32",
        alias: "アサせんせい32",
        tone: "4",
        mean: "阿佐老师32",
        id: 5,
        familiar: true,
        spell: "azls32"
      },
      {
        groupId: 3,
        word: "アサ先生33",
        alias: "アサせんせい33",
        tone: "5",
        mean: "阿佐老师33",
        id: 6,
        familiar: true,
        spell: "azls33"
      }
    ],
    groups: [
      { name: "1", desc: "1", id: 1 },
      { name: "2", desc: "2", id: 2 },
      { name: "3", desc: "3", id: 3 }
    ],
    //   words:[],
    //   groups:[],
    practiceOption: {
      isCourse: true,
      practiceGroups: [],
      practiceCount: 10,
      testWord: true
    },
    imgId: 1,
    lastActiveKey: "2"
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {}
};
