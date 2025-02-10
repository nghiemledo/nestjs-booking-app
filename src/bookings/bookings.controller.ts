import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDTO } from './bookings.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingsService) {}

  @Get()
  @Roles(Role.Admin)
  async getBooking() {
    const bookings = await this.bookingService.getAllBooking();
    return { data: bookings };
  }

  @Post()
  async createBooking(@Body() bookingDTO: BookingDTO) {
    const newBooking = await this.bookingService.createBooking(bookingDTO);
    return { data: newBooking };
  }

  @Delete('/:id')
  deleteBooking(@Param('id') id: string) {
    return this.bookingService.deleteBooking(id);
  }
}
