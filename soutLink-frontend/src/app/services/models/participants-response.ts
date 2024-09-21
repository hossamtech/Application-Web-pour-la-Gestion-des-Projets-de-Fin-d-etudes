/* tslint:disable */
/* eslint-disable */
import { Participant } from '../models/participant';
export interface ParticipantsResponse {
  owner?: Participant;
  partners?: Array<Participant>;
}
