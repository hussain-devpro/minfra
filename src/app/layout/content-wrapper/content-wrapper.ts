import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-content-wrapper',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './content-wrapper.html',
  styleUrl: './content-wrapper.scss',
})
export class ContentWrapper {}
