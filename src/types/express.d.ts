import { ExtendedSession } from '../commom/types';

declare global {
  namespace Express {
    interface Request {
      session?: ExtendedSession;
    }
  }
}
