import {AppState} from '../index';

export const selectConversations = (state: AppState) => Array.from(state.conversationsState.conversations.values());

export const isLoading = (state: AppState) => state.conversationsState.isLoading;

export const currentConversation = (state: AppState) => state.conversationsState.currentConversation;
