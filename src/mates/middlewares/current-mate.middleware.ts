import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Mate } from '../mate.entity';
import { MatesService } from '../mates.service';

declare global {
  namespace Express {
    interface Request {
      currentMate?: Mate;
    }
  }
}

@Injectable()
export class CurrentMateMiddleware implements NestMiddleware {
  constructor(private matesService: MatesService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { mateId } = req.session || {};

    if (mateId) {
      const mate = await this.matesService.findOne(mateId);
      req.currentMate = mate;
    }

    next();
  }
}
