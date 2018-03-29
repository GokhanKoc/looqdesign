import * as AuthActions from './auth'
import * as ChatsActions from './chats'
import * as QuestionActions from './questions'
import * as LocationActions from './location'


export const ActionCreators = Object.assign({},
  AuthActions,
  ChatsActions,
  QuestionActions,
  LocationActions
);
