import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NewsletterService } from 'src/app/services/Newsletter.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessagingService } from 'src/app/services/Messaging.service';
import * as Swal from 'sweetalert2';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit, AfterViewInit {

  states: any;
  newsletterForm: FormGroup;
  Swal = (Swal as any);
  @ViewChild('image', { static: false }) image: ElementRef;

  images = [
    {
      img: 'https://ticketagora.com.br/img/home/corredora_solo.png',
      alt: ''
    },
    {
      img: 'https://ticketagora.com.br/img/home/corredor_solo.png',
      alt: ''
    },
    {
      img: 'https://ticketagora.com.br/img/home/cursos_solo.png',
      alt: ''
    },
    {
      img: 'https://ticketagora.com.br/img/home/triatleta_solo.png',
      alt: ''
    }
  ];

  constructor(private newsletterService: NewsletterService
    , private fb: FormBuilder
    , private messagingService: MessagingService) { }

  ngOnInit() {
    this.newsletterForm = this.fb.group({
      name: [''],
      email: [''],
      state: [''],
      subject: ['newsletter'],
      message: ['newsletter']
    });

    this.newsletterService.getStates().then((res) => {
      this.states = res;
    }).catch((error) => {
      console.log(error);
    })
  }

  ngAfterViewInit() {
    const arImages = this.image.nativeElement.children;
    const imageLength = this.images.length - 1;
    let hasActive = 0;

    setInterval(function () {
      Object.keys(arImages).map((key, i) => {
        if (arImages[key].classList.contains('active')) {
          hasActive = i;
        }
      });

      if (hasActive < imageLength) {
        arImages[hasActive].classList.remove('active');
        hasActive = hasActive + 1;
        arImages[hasActive].classList.add('active');
      } else {
        arImages[hasActive].classList.remove('active');
        arImages[0].classList.add('active');
      }
    }, 5100);
  }
  openNewsletterTerm() {
    this.messagingService.postMessage(this.newsletterForm.value, 'NT')
      .subscribe(data => {
        this.Swal.fire(
          'Solicitação enviada com sucesso',
          data,
          'success'
        )
        this.newsletterForm.reset();
      }),
      err => {
        this.Swal.fire(
          'Erro ao enviar sua solicitação!',
          err,
          'error'
        )
      }
  }
}
