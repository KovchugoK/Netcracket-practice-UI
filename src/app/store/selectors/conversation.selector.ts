import {AppState} from '../index';

export const conversationsList = (state: AppState) => Array.from(state.conversationsState.conversations.values());

export const isLoading = (state: AppState) => state.conversationsState.isLoading;

export const currentConversation = (state: AppState) => state.conversationsState.currentConversation;