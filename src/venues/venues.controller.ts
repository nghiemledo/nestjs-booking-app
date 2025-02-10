import { Controller, Get, Patch, Post } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { Request, Response } from 'express';

@Controller('venues')
export class VenuesController {
  constructor(private venuesService: VenuesService) {}

  @Get()
  getVenues(request: Request, response: Response) {
    const venues = this.venuesService.getAllVenues();
    return response.status(200).json({
      status: 'Success',
      message: 'Logged in successfully',
      data: venues,
    });
  }

  @Post()
  createVenue(request: Request, response: Response) {}

  @Patch('/:id')
  updateVenue(request: Request, response: Response) {}
}
