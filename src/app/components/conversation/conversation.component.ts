import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {skipWhile, take} from 'rxjs/operators';
import {Conversation} from '../../model/Conversation';
import {ActivatedRoute} from '@angular/router';
import {AppState} from '../../store';
import {currentConversation, isLoading} from '../../store/selectors/conversation.selector';
import {getConversationAction} from '../../store/actions/conversation.action';
import {Message} from '../../model/Message';
import {updateMessagesAction} from '../../store/actions/message.action';
import {ChatServerService} from '../../services/chat-server.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(currentConversation)
  currentConversation: Observable<Conversation>;

  constructor(private route: ActivatedRoute, private ngRedux: NgRedux<AppState>, private chatService: ChatServerService) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() =>
        this.ngRedux.dispatch(getConversationAction(
          this.ngRedux.getState().currentUserState.currentUser.account.id,
          this.route.snapshot.paramMap.get('id')
          )
        )
      );

    this.chatService.connect();
    this.chatService.getMessages().subscribe((message: Message) => {
      this.ngRedux.dispatch(updateMessagesAction(message));
    });
  }

  sendMessage(messageBody: string) {
    /*let conversation: Conversation;
    this.currentConversation.subscribe(conv => conversation = conv);*/
    this.chatService.sendMessage({
      conversationId: this.ngRedux.getState().conversationsState.currentConversation.id,
      senderId: this.ngRedux.getState().conversationsState.currentConversation.firstAccount.id,
      receiverId: this.ngRedux.getState().conversationsState.currentConversation.secondAccount.id,
      msg: messageBody,
      creationDate: new Date()
    }).subscribe(answer => {
      if (answer === 1) {
        this.ngRedux.dispatch(updateMessagesAction({
          conversationId: this.ngRedux.getState().conversationsState.currentConversation.id,
          senderId: this.ngRedux.getState().conversationsState.currentConversation.firstAccount.id,
          receiverId: this.ngRedux.getState().conversationsState.currentConversation.secondAccount.id,
          msg: messageBody,
          creationDate: new Date()
        }));
      }
    });
  }
}
