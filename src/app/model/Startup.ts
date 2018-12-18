import {StartupResume} from './StartupResume';
import {Account} from './Account';
import {Investment} from './Investment';

export interface Startup {
  id: string;
  startupName: string;
  idea: string;
  aboutProject: string;
  businessPlan: string;
  sumOfInvestment: number;
  account: Account;
  startupResumes: StartupResume[];
  dateOfCreation: Date;
  imageId: String;
  compressedImageId: String;
  image: String;
  startupInvestments: Investment[];
  nonBlock: boolean;
}

export const defaultStartup: Startup = {
  id: null,
  startupName: '',
  idea: '',
  aboutProject: '',
  businessPlan: '',
  sumOfInvestment: 0,
  account: null,
  startupResumes: null,
  dateOfCreation: null,
  imageId: '',
  compressedImageId: '',
  image: '',
  startupInvestments: null,
  nonBlock: true
};
