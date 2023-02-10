import axios from "axios";
import { action, createStore, thunk } from "easy-peasy";

const store = createStore({
  stacks: [],
  cards: [],
  loading: false,
  error: null,
  getStacks: thunk(async (actions, payload) => {
    actions.setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/stacks");
      actions.setData(response.data.results);
      console.log(response.data.results);
    } catch (e) {
      actions.setError(e);
    }
    actions.setLoading(false);
  }),
  changeStackName: action((state, payload) => {
    let stack = state.stacks[payload.id-1];
    stack.name = payload.name;
    axios.post("http://localhost:3001/stackname", {_id: stack._id, name:stack.name});
  }),
  changeCardContent: action((state, payload) => {
    let card = state.stacks[payload.stack_id-1].flashcards[payload.card_id];
    if(payload.front){
      card.front = payload.front;
    }else{
      card.back = payload.back;
    }
    axios.post("http://localhost:3001/flashcardcontent", {_id: state.stacks[payload.stack_id-1]._id, flashcard_id:payload.card_id ,flashcard:card});
  }),
  newStack: thunk(async (actions, payload) => {
    const response = await axios.get("http://localhost:3001/newstack");
    const stack = response.data;
    actions.addStack(stack);
  }),
  newCard: action((state, payload) => {
    console.log(payload.CardData);
    async function req(){
      const response = await axios.post("http://localhost:3001/newcard", {_id: state.stacks[payload.id-1]._id, type: payload.CardData.type, front: payload.CardData.front, back: payload.CardData.back});
      const card = response.data;
      console.log(card);
    }
    req();
  }),
  setData: action((state, payload) => {
    state.stacks = payload;
  }),
  addStack: action((state, payload) => {
    state.stacks.unshift(payload);
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
});

export default store;