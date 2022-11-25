import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GroupComponent } from './components/group/group.component';
import { FacadeService } from './engine/facade.service';
import { ComponentRegistry } from './engine/component.registry';
import { TextInputComponent } from './components/text-input/text-input.component';
import { SelectComponent } from './components/select/select.component';
import { EngineModule } from './engine/engine.module';
import { account } from './schemas/account';
import { contactList } from './schemas/contact-list';
import { contact } from './schemas/contact';
import { OneOfComponent } from './components/one-of/one-of.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    EngineModule,
    GroupComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(facade: FacadeService, componentRegistry: ComponentRegistry) {
    componentRegistry.setAll({
      'group': GroupComponent,
      'oneOf': OneOfComponent,
      'textInput': TextInputComponent,
      'select': SelectComponent,
    });

    facade.registerSchema('contact', contact);
    facade.registerSchema('contactList', contactList);
    facade.registerSchema('account', account);
  }
}
