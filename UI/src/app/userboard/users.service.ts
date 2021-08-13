import { environment } from '../../environments/environment';
import {Injectable} from "@angular/core";

import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

interface UploadFileParams {
  event: any;
}

@Component({
  selector: 'app-user-service',
  template: `
  <ul>
    <li *ngFor="let item of item$ | async">
      <h2>{{ item.first_name}} {{ item.last_name}}</h2>
      <p>{{item.summary}}</p>
      <img
        width="250"
        loading="lazy"
        alt="Random image"
        src="{{item.img}}">
    </li>
  </ul>
  <button nbButton (click)="setData()">Set data</button>
<!--  <button nbButton (click)="uploadImg()">Upload img</button>-->
<!--  <input type="file" (change)="CreateUser($event)">-->
<!--  <div>{{ uploadPercent | async }}</div>-->
<!--  <a [href]="downloadURL | async">{{ downloadURL | async }}</a>-->
  `
})

// @Injectable()
export class UserService {
  item$: Observable<any[]>;
  db: AngularFirestore;
  storage: AngularFireStorage;
  uploadPercent: Observable<number> | undefined;
  downloadURL: Observable<string> | undefined;

  constructor(firestore: AngularFirestore, firestoreStorage: AngularFireStorage) {
    this.db = firestore;
    this.storage = firestoreStorage;
    // console.log("hello");
    this.item$ = firestore.collection('speakers').valueChanges();
    // console.log(this.item$);
    // this.item$ = "";




  }

  showCards(){
    this.item$ = this.db.collection('speakers').valueChanges();
  }

  // uploadFile(event: any) {
  //   // console.log(event.target.files);
  //   const file = event.target.files[0];
  //   const filePath = 'speakersImg/' + Math.random().toString();
  //   const ref = this.storage.ref(filePath);
  //   // const task = ref.putString(file);
  //   // const task = this.storage.upload(filePath, "https://lh3.googleusercontent.com/h_hDXPaTtfsDhtUSSizRYNMxLdaJmaz7yw53oAorZcB9rsKI_QVR95oi2e_ds-5LIhseabj755Mz-gLovx_lyqnNaeIPFPlvTD-jIr0Ui0BRovjRQUvehHPUF4FapjcA3pqU6RASXmCNr65EBD1wxbpIP5QGy_GdveSI9YjpWHrHjSGrruiT4LYZPh7ZmNbeLC93JiEw2XJd_TMbgL0YWMWW7MZs3QT0Wo2MDP05uj8dL69CnOffYwHgWmbwuqUmMXjNAFb8opqpTglRdJjWHoW2dYmKOnsPn8U60zlT02G8WIWx8j4Tfm5n6JmMnIycdiNFtirbll_hVV1lj9GwU6mmshemKv-HA-VvS1KWFhLt7DX4QUuv0_fIDWg4w0UBVs1ahnaEvLso2GVG_8QU7e9YJrDVGcrNb09dVo_tFb2ZpjlQNvtweSoaVzHVCiQ32qNMgbJMZpaRbHh9Y7RTM6KO-dhhQ-SfNsNkIFfuHIXMQe3kJPrxrzJYKIIIZg8gkjiHWUCUvWFWEB6zIPDlEM6cfE7OJ5XwOMPtaaSRNpbjaAVyRCp1UQrpTj2ehMnIGiXI8MKKvWMFvIyTIYgmRRNG32xV0xbI5LAhcoTIjSl8H0XVaXhdNnl8UOe4Ru5khBNahtdJXnx5XeyWj7Su4V0H-x85SYa6Z4jiBeQBcjnGl9E6cpFhWAJq8JnZaXVdA3-hKtePTYJ4h-kc0bUmPYo=w1670-h1252-no?authuser=0");
  //   const task = this.storage.upload(filePath, file);
  //   // @ts-ignore
  //   this.uploadPercent = task.percentageChanges();
  //   // get notified when the download URL is available
  //   task.snapshotChanges().pipe(
  //     finalize(() => this.downloadURL = ref.getDownloadURL() )
  //   )
  //     .subscribe()
  // }
  //
  // CreateUser(event: any) {
  //   // console.log(event.target.files);
  //   const name = "denis";
  //   const file = event.target.files[0];
  //   const filePath = 'speakersImg/' + name;
  //   const ref = this.storage.ref(filePath);
  //   // const task = ref.putString(file);
  //   // const task = this.storage.upload(filePath, "https://lh3.googleusercontent.com/h_hDXPaTtfsDhtUSSizRYNMxLdaJmaz7yw53oAorZcB9rsKI_QVR95oi2e_ds-5LIhseabj755Mz-gLovx_lyqnNaeIPFPlvTD-jIr0Ui0BRovjRQUvehHPUF4FapjcA3pqU6RASXmCNr65EBD1wxbpIP5QGy_GdveSI9YjpWHrHjSGrruiT4LYZPh7ZmNbeLC93JiEw2XJd_TMbgL0YWMWW7MZs3QT0Wo2MDP05uj8dL69CnOffYwHgWmbwuqUmMXjNAFb8opqpTglRdJjWHoW2dYmKOnsPn8U60zlT02G8WIWx8j4Tfm5n6JmMnIycdiNFtirbll_hVV1lj9GwU6mmshemKv-HA-VvS1KWFhLt7DX4QUuv0_fIDWg4w0UBVs1ahnaEvLso2GVG_8QU7e9YJrDVGcrNb09dVo_tFb2ZpjlQNvtweSoaVzHVCiQ32qNMgbJMZpaRbHh9Y7RTM6KO-dhhQ-SfNsNkIFfuHIXMQe3kJPrxrzJYKIIIZg8gkjiHWUCUvWFWEB6zIPDlEM6cfE7OJ5XwOMPtaaSRNpbjaAVyRCp1UQrpTj2ehMnIGiXI8MKKvWMFvIyTIYgmRRNG32xV0xbI5LAhcoTIjSl8H0XVaXhdNnl8UOe4Ru5khBNahtdJXnx5XeyWj7Su4V0H-x85SYa6Z4jiBeQBcjnGl9E6cpFhWAJq8JnZaXVdA3-hKtePTYJ4h-kc0bUmPYo=w1670-h1252-no?authuser=0");
  //   const task = this.storage.upload(filePath, file);
  //   // @ts-ignore
  //   this.uploadPercent = task.percentageChanges();
  //   // get notified when the download URL is available
  //   task.snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = ref.getDownloadURL();
  //         ref.getDownloadURL().subscribe((url) => {
  //           this.addUserData({user: "user"}, url);
  //         })
  //       })
  //     )
  //     .subscribe();
  //
  //   // this.downloadURL().subscribe((url) => console.log(url));
  //
  //
  // }
  //
  // addUserData(user: object, url: string){
  //   const speaker = {
  //     "title": "Denis",
  //     "summary": "ex-President of Onexim Sports",
  //     "img": [url]
  //   };
  //   console.log(user);
  //   this.db.collection('speakers').add(speaker).then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //     .catch((error) => {
  //       console.error("Error adding document: ", error);
  //     });
  // }
  //
  // uploadImg(){
  //   const filePath = 'gs://dialogflow-14c33.appspot.com/speakersImg'
  //   const file = 'https://lh4.googleusercontent.com/Lga-RYhPPaWo9IAK-GOQGNIF1TVwB3DjkL9Pi7QouzTrGnV8dAPeaWT3_RztOBGxmL84nqA57Oog6a-Mb5_qpImNOdAzser3b0am-TL2rTAVcRo0ahbm302fdKsWTeMS6A=w1280';
  //   const ref = this.storage.ref('speakersImg');
  //   ref.put(file);
  // }

  setData(){
    const speakers = [
      {
        "title": "Irina Pavlova",
        "summary": "ex-President of Onexim Sports",
        "img": "https://lh3.googleusercontent.com/ZAZe5ksJGMHW18z79ANidJkxYojpWIPf-AObCeP-nB67XJUOWrNHDxh_qPMFv_dnltVY1LMZWHALNLbAdF308hkcduW9YPN2w7V96a7TuTnFDEM8aUOfepnebmwGdjzrmQ=w1280"
      },
      {
        "title": "Dmitry Kryukov",
        "summary": "Elbrus Capital Partner",
        "img": "https://lh5.googleusercontent.com/-eyFGIROYcNWF3LvQPTdm0qKG8lZZjM5jRbcUZgYK-chVkX4slJ7f_C1NC26G-MJRHu2YA=w1280"
      },
      // {
      //   "title": "Vladimir Verkhoshinskiy",
      //   "summary": "CEO Alfa Bank",
      //   "img": "https://lh4.googleusercontent.com/vWdHG4brwmIvGFXsKBBKPond1ID9My3R1AcbhhhAV6zDAO62ZYAXPDH1eSjkbNNssVStQw=w1280"
      // },
      // {
      //   "title": "Semyon Dukach",
      //   "summary": "",
      //   "img": "https://lh4.googleusercontent.com/kdgnwl5bGNkElkOnQBdgEj0z1aG5ipt5_jwe_Xtpfp-j__-8sONerjQfLpYtpi2yrWDST0PXZ260uo-DyS6sErzapK3KboUYvmYwKw6O7NqO-dz8_0s1wrpuwQPm6iMKDA=w1280"
      // },
      // {
      //   "title": "Timur Artemev",
      //   "summary": "Managing Partner, One Way Ventures",
      //   "img": "https://lh6.googleusercontent.com/_cMLxd8VuVfp5awKe9nwQdmsK41K4r-7rCMjrUa1s-tMN2DtbjOyF_oSz81rIJrs4kJzYAp_Ycm8JVTX4Olg3WNezIcNv_nd8zRVOo19Onu4HPimphGQOvvgS-upSRX0Mg=w1280"
      // },
      // {
      //   "title": "Vladimir Ashurkov",
      //   "summary": "investor and entrepreneur, co-founder of the Euroset.",
      //   "img": "https://lh3.googleusercontent.com/Rv4YWJ6PXDGf17P1sq-LuD0LxqchxsJtmmyYE6YNK9h2LZovpDPAQSnjxyTYIZklbecSQJNW4VdGLaRarxFmp6k=w1280"
      // },
      // {
      //   "title": "Andrew Kozlov",
      //   "summary": "Executive Director of the Anti-Corruption Foundation.",
      //   "img": "https://lh4.googleusercontent.com/dLErG7CQS6URXAlspoB0KgJbR9RL5HVvhXnhqP8UBwpEX_q779Dq4PcCAaRknz_qfP4DcPjzkRtIo4a5CM29obBEqytBxyc-brFlGgPUYxnWnbb8a5ELF-D6eDUYq2D7YQ=w1280"
      // },
      // {
      //   "title": "Dmitriy Sedov",
      //   "summary": "Managing Partner 4BIO Capital",
      //   "img": "https://lh4.googleusercontent.com/KynT2PcaA69MYJTxjRhTy51fCuCz0mZvTWpHqgff4Z5fv0lysNVeJZOuAOKgBgoDyXGGjHJWTvGakdsPgSUcQPM=w1280"
      // },
      // {
      //   "title": "Dan Milstein",
      //   "summary": "Chairman, Goldman Sachs Russia",
      //   "img": "https://lh5.googleusercontent.com/4tZ9T71XB_ZhriW_ZfrGDPAviZqRSBnXK5Ew1qvPVsPnt22qa7feLmBiuu20WPwUMfPGWbjDQxFPFiPkE6lLilqOR0uCCNtFZQkHxBAAJgZ1i5B9nm8dyQUovR6FtdFhfw=w1280"
      // },
      // {
      //   "title": "Gleb Davidyuk",
      //   "summary": "Entrepreneur, author, founder & CEO of Gold Star Financial Group",
      //   "img": "https://lh3.googleusercontent.com/u2tRjVrkXN2uSDmDYaYZnHg53iUjEz38Hm7Hy6YwlIgJJbz1zScts-cmxHiRRzlLBD4shNWejyn-LgCco1F1Kx6obeBm0yB6NrVCleuv2CP-xDP6bmhbyBvgfqgl597TbA=w1280"
      // },
      // {
      //   "title": "Oliver Hughes",
      //   "summary": "Managing Partner iTech Capital",
      //   "img": "https://lh3.googleusercontent.com/RGihgtuapkcvzXcyOc1yZgf1k8cBNacYTAI2RdoMH3-Rj1_ISovoHHv5rFhlOiunZ0uNaz6Wo_1z54EADbwg1Ofn3hgBLiZunYzSwfmqqH_uN8sGJRnS0klzbKO-J-i5sw=w1280"
      // },
      // {
      //   "title": "Anton Gopka",
      //   "summary": "CEO, Tinkoff Bank",
      //   "img": "https://lh3.googleusercontent.com/v7BrzxiknJJwsGQ1COHVfL9r0WnDIxCv1X3sQtUFlQocBkf8ACMx0KcDWPYMzub9KCNUsPzz9M7i8OemABzE7V0oqAPLBr-apGXOXeYjj5tDMI1e4eZes2TI00YQworo-g=w1280"
      // },
      // {
      //   "title": "Timur Akazhanov",
      //   "summary": "CEO and General Partner at ATEM Capital",
      //   "img": "https://lh5.googleusercontent.com/bYgvsdB1H-COkkE3Mz49OxEbkzfijEnFMAyIrR_Cw9bh4x88GOchExGxRhBP8jdA5tFd6SnyfYmaE88-Gyk9qdOP2DSiw87-BMfbFbXBJtSbs7NMwpvSi53XXChbqMnB=w1280"
      // },
      // {
      //   "title": "Andrey Titov",
      //   "summary": "HBS '11, MD at Blackstone Group",
      //   "img": "https://lh4.googleusercontent.com/GwNPEOtm2RL5XI8-kMZVjfH9wEQYgasRJVhlknD2KJuzFz1CoKVC-eh1W5HALDucMKt7xmfBpSBE9Mmk-j87MC7lA0GqNOxzmCKpI_dTinCd4grt6QVia9SqX3MMmEGUNg=w1280"
      // },
      // {
      //   "title": "Alex Gelman",
      //   "summary": "MIT MBA '07, Director at Cisco",
      //   "img": "https://lh5.googleusercontent.com/aHoX7EWpWQYWm3AS4g9GoUbiCIEvb0mYr5ksHAWqJgzK3PnTh303OJJtAFYi3t5q1AjUIZXp3NitV1VHiUBwy2-ZWZD0XMFPqInxahCVcmZh0SYVu6qZiDJw73yImxhMow=w1280"
      // },
      // {
      //   "title": "Marina Jigalova-Ozkan",
      //   "summary": "GSB MBA '13, Founder of Gelman Brothers, Ex-KKR",
      //   "img": "https://lh3.googleusercontent.com/e9I5PiK6MTSY9Bu-k2J9R-wlx9tCgk5YQRMsK3zF_MxAzr0d99zbcKk2khwpUUTTCFUOpekth4qGRQuUiPk-Sr5S-3C_JmHgCMDrSjEvLxK6x-4WBpsTJnky9F6aDkd3Cw=w1280"
      // },
      // {
      //   "title": "Maxim Lapin",
      //   "summary": "Managing Director Walt Disney Company",
      //   "img": "https://lh6.googleusercontent.com/N28UGFwxOnSCz6znriAcSuf0LBTJal4Rt-EIOwmTZ5ryFTPS6tKUMrahnjf_x0gf5BbezOjEvV_vz5GaP825jRipZi5f7shL1EY6-iAJJ9-LbVKyRev5jsAq1LcdjmkTag=w1280"
      // },
      // {
      //   "title": "Maxim Nogotkov",
      //   "summary": "CBS MBA '07, CFO at MOEX",
      //   "img": "https://lh3.googleusercontent.com/aCCEAr-lq7M9o7NEbKZZvZmmNkV210vaM41Z0h8Sju5knFBnNWA9xwFoPmO8BxxctBvxp6b9zXShJeofRnq2ouLWZmMy3f4GhwQVvqrCBWPWc1eZggbFT-5C5UO_9CVAFw=w1280"
      // },
      // {
      //   "title": "Oleg Mikhailov",
      //   "summary": "Founded Svyaznoy and Svyaznoy Bank",
      //   "img": "https://lh4.googleusercontent.com/WSeZHW3SeLRcxzmk5eVz2C4TEUkNFJ8vqS3Jt7-KRsi3JjscmwJysNWO4uYdMIvTj7waLkAXla6RaRlFzEUni8QgVkvHGugNEtZy66N7Z4G9W7vNog4HnG-2izTYS3Nq1w=w1280"
      // },
      // {
      //   "title": "Misha Esipov",
      //   "summary": "MIT PhD, Berkeley MBA, MD at Alix Partners",
      //   "img": "https://lh3.googleusercontent.com/FHtAhSg7Gl9uJvoxUrmJbgPO1f8nAJG3w0wxPF67Qfqcy7N7pVaiuokqtl-kt1WDs7bVqwygKizlvxIGMVcIzX3Qx0OSrnMe5XjJoap6PqIEcfHorPlR9Y2rlqswQlJx_A=w1280"
      // },
      // {
      //   "title": "David Yang",
      //   "summary": "Stanford MBA '16, Founder of Nova Credit",
      //   "img": "https://lh6.googleusercontent.com/nHspM37SzQSf64q5YUOtGVVL5kuxH5DlBDlQgT1zhxC2Svzaf8JRuvnA4rIz-kXrmCml2LfWttF_p6qwq5U-6IBAnjA3vRW0cvoEZ_IOIPnBZMgN7Js7V46pogkIqGdabg=w1280"
      // },
      // {
      //   "title": "Viktor Kats",
      //   "summary": "CEO/Co-Founder Yva.ai, Founder ABBYY",
      //   "img": "https://lh4.googleusercontent.com/2NOzG_b3KOBFhKKOs24tZ3DK1Jhds3YkZzKERrobDjHqAqFjStcX9tsxzRZ3e72TsZ9D3WGwuhhZpP96Pnlq3bUIX2zQNcVa4OpzCJXHYt7OtnFHSGX9InTZaL5lYl8LcA=w1280"
      // },
      // {
      //   "title": "Igor Klebanov",
      //   "summary": "INSEAD MBA, Founder of Augment fund",
      //   "img": "https://lh5.googleusercontent.com/Av-cDm2RRpLP3JmGMH5CatgolEHSWE3ehsTJLOoQE_wI__vnHCS3ot0pt1yzwtIFpnwvWhLHR7kruLBpUJAQ1Ak=w1280"
      // },
      // {
      //   "title": "Mikhail Brodsky",
      //   "summary": "Wharton '04, Managing Partner at Glanstone, Infrastructure focus",
      //   "img": "https://lh3.googleusercontent.com/qT9rY4MsDcVR3t3yBkJpGyX7OFd_mIr1Tm0UA-lILL5SX_FmFrWndzYMmvO5sQiTAdGBXsLwtAFsll3cA4irTg8aYtQqGSlhrjKHUOTZtjhdx-xrXnG98nvj9DGOVViWbA=w1280"
      // },
      // {
      //   "title": "Alexander Galitsky",
      //   "summary": "President at Lincoln University",
      //   "img": "https://lh6.googleusercontent.com/iBszJD9LlzlftysHMao6yEHhJNRM0GKW3DanE0ymMNnMIHo-JRDqOSNAH9C3L24HfmKoMsHdT_Av9CZ8T4ae0CZ3Fy2zHPhj8EMetFMMs_OSquhxkW25y167bPEE3JxVVw=w1280"
      // },
      // {
      //   "title": "Alex Shevchenko",
      //   "summary": "President of ELVIS-PLUS and partner of Almaz Capital",
      //   "img": "https://lh5.googleusercontent.com/1f6NM7z4DY-PfygH3m6zI7wKEAhrOQBdvSgTc9AbQ10FNHsmEOa8AQwj0zuJZT3Nk2FeF-0C7bjysvCoxFdhIGKxBTYwkUmQVbZi4V0oB1C6oQxTOZPuG9Ga6nY0gSXZFg=w1280"
      // },
      // {
      //   "title": "Alexander Konoplyasty",
      //   "summary": "Co-Founder of Grammarly",
      //   "img": "https://lh3.googleusercontent.com/050rPspsfHHt4i8U4GFj_VM21hjv-33KeuT1AlHDSQCsARgkhT2w7vMGXS1RejL4Oskj4Qp7yoLx9giOkdii66NDVpvEC0B_BV4mEHoSpiQ0oLxthvz3nHlLkbr8TE4Qjg=w1280"
      // },
      // {
      //   "title": "Bernie Sucher",
      //   "summary": "Co-Founder at Flashpoint Ventures",
      //   "img": "https://lh4.googleusercontent.com/BBRkmT-Oc500zvYpmDr70HQithb-VHe3SGF9tEu-b-K7XMTKYvci9wbHuiaU5fwmwvdTq16asC05OKW-GEWdOw8PZCogPlfRI3k4kJB87jrFbzfecIeiwey6xlkHPwXedw=w1280"
      // },
      // {
      //   "title": "Alexei Andreev",
      //   "summary": "co-founder Troika Dialog, ex-CEO Merrill Lynch Russia, ex-CEO Alfa Capital, CEO Tikun Olam",
      //   "img": "https://lh6.googleusercontent.com/jOMqFyIcjdKqUVC5Dd_eJF_rDjOxMLZgQjsfNr2T0FwGxs62CXBr1c9UwfnbywhkfeyM6eMwsljOV5vU_Q5gRtjk7ybr6-gDSimTG9hL06UNF6_qxj9Bd4AlmiF82xBO=w1280"
      // },
      // {
      //   "title": "Misha Lozovik",
      //   "summary": "Stanford MBA '02, Co-Founder and MD at Autotech",
      //   "img": "https://lh4.googleusercontent.com/cunFU6BWwuGBlWqf1OKVoDibTdfLmdrF_8u7d0RXylkyC5PeoiXUB68mnig7Gwuz6tpsjA98k-6Atb5WEPc0yFsQEaQAFaSEL5jcqJrtwUvGnv9MTuU4Edy-sykZBTJqAA=w1280"
      // },
      // {
      //   "title": "Ilya Ponomarev",
      //   "summary": "Wharton MBA, Director at Blackrock",
      //   "img": "https://lh4.googleusercontent.com/xz1ePZVqg_W6UyvUairj8ltywkG3-wjhxrAFhfcCJvQKdu6OPunwAutTzoXw1YmN1L-XB6JUIb0deBP0mdSzzGJo03QJEbXjwE5SHPpuslN_YWGncIp8oKwiaYW2xA2q5A=w1280"
      // },
      // {
      //   "title": "Timur Bekmambetov",
      //   "summary": "CEO of a SPAC company Trident Acquisitions",
      //   "img": "https://lh6.googleusercontent.com/n6yQ9UyAvq1QZdxv3NHSoGoLfchuE_omM2mBF4ggZD6aCPzOMZIjAAR7q1ZYhXTanklSwURmsVyX8e61asgUdEy3QjzF1-Bf0gAWZ9Ql_KezqGjDpRvYuNHVFnqvaUG2bQ=w1280"
      // },
      // {
      //   "title": "Boris Lipchin",
      //   "summary": "Director, producer and screenwriter",
      //   "img": "https://lh4.googleusercontent.com/h4DxEHAZiH0uqd6WPOiYUTxKJSWIVdMCEKUnZc2nGidZQChXdRNS57wk3wjSwxz3R_ZSoQYe868ICPBdcIE5US6ZGT4a0NyPEx9_r1SpuEhb7fjzLePuL7qD3FMnHwKDxw=w1280"
      // },
      // {
      //   "title": "Yury Dubrovsky",
      //   "summary": "Co-Founder/CEO at Brio, Carnegie Mellon / MIT",
      //   "img": "https://lh5.googleusercontent.com/Qde_IuNL5Sg1YGqC5lYrftmSeZzpUupTZu4QKxopqpo2eNK-tH2MHYiXLlnfayqtRxANFQzeaT8l2DQlMWrZjqI=w1280"
      // },
      // {
      //   "title": "Victor Shaburov",
      //   "summary": "CRO, Lazard",
      //   "img": "https://lh4.googleusercontent.com/JSOuLATEZcGnfuI6L_0zSPHt3RALtMeenLV5yXqLevaOx0Hs8X7HHZ2fA2yysQQyxIi4NiQP6wY3q4SazoJtpxo6ujTJ5e-iTkFYZNMRAQDajfiKCx4xfF6W9PfKL7W2Sw=w1280"
      // },
      // {
      //   "title": "Max Klimov",
      //   "summary": "Founder of AI Factory, Looksery",
      //   "img": "https://lh5.googleusercontent.com/IyZM34TASHRH5S5JxkEi7XuvMuNz3u4agrcNoMz2VInUNrGkUsB_9fv0NFo89RJeCskTOGoaWVAiTVVMaInHQc5mbcByWLLSpmQVWNqu_gyytUaGB8HFH5MmoEo0NeChUA=w1280"
      // },
      // {
      //   "title": "Viatcheslav Pivovarov",
      //   "summary": "Partner at Goldman Sachs, PE Group, Russia",
      //   "img": "https://lh5.googleusercontent.com/mz03WUbBnCUz62Rdg8fLeqlQIIrX-7xI6o-kU0xP9GsFHAXmmRz6xnsTyiVtPAiT_jCwmeWxApbh7ILGgqfaQD4=w1280"
      // },
      // {
      //   "title": "Alex Rodzianko",
      //   "summary": "Stanford MBA, Founder at Altera Capital",
      //   "img": "https://lh5.googleusercontent.com/o_abjhi-sFZA-wKaNYMX8gTLBlsFkj2yv9OyJOpBnrd7B24ZZ50DHNiDKKOOttvYeSu1C_EJmNntGu19UYiuC2qzuyXIsxyAXt9Knc-5OLBeg9OIcYGIRl42Ok1PMxsSig=w1280"
      // },
      // {
      //   "title": "Alexander Malakh",
      //   "summary": "Columbia MBA, CEO American Chamber of Commerce",
      //   "img": "https://lh6.googleusercontent.com/BVJkwtKIXQXXkmtrVj_-PKPnKUB4KiOIosI2Z5qJD0UHW1fHtfXWarJytxmN03mddPZ1AYxu_6486hRvRmDUz66fdYXroQzMb_l8Z2o9EiwaLpjFvLRo2PEvzTDBohXzIA=w1280"
      // },
      // {
      //   "title": "Max Melnikov",
      //   "summary": "Wharton MBA, Director at RDIF",
      //   "img": "https://lh3.googleusercontent.com/ewHW2M9LtgF1O8v0WMIHpZeHzuhaW58tNzjTQx6ONZO5KU7ShUNeCjHsP_DBFJrGnr_HA_eLLuGBQBzNi9__lPilgRo7BixbJ4U3Yu1uto2dP0p-mn3iu2womhZGtq3nlg=w1280"
      // },
      // {
      //   "title": "Vadim Gouterman",
      //   "summary": "Stanford MBA, CEO at Cian",
      //   "img": "https://lh5.googleusercontent.com/DZFOMYOyru1zdX8hRtmm2uiKwsF1ufF0sQ7RTEP2AywazLjN_QWRTJ28Fu08_jbrT7aH_yzv8DFvejZ-Cq_CjLe5UEWJTRqG3iVkmtTIQwV13hW3SgQhWBojRb27kc-ffQ=w1280"
      // },
      // {
      //   "title": "Tatyana Bezuglova",
      //   "summary": "MD and Partner at BCG",
      //   "img": "https://lh6.googleusercontent.com/3erKD5BHQd2Wmi12XoHRaR7VsD_kmioUC6Q-brKMjlOcJcmQ5jY5ysztHUDHyaJGVXhjBD9XHnID-A6hvnCkonwtEccLCMxCXM8S0qRwFSBveiO7CVufx6UmqWRD24L0eA=w1280"
      // },
      // {
      //   "title": "Maxim Basov",
      //   "summary": "Head of Strategy at Waymo, Harvard BA / LBS MBA",
      //   "img": "https://lh4.googleusercontent.com/PN28y9iVm1YkOdCb09ZOcle0GkGbDfn1cSCFyfhO0hzhIaqJFBV5BnWOZuhOEyXLBDAZjTkJ2OQNzh0e0dmtP3sWDBbm_i7yA09c5wnIs2og_TjxnXHzvYk4_z7zv71AHA=w1280"
      // },
      // {
      //   "title": "Natalie Jaresko",
      //   "summary": "CEO Rusagro",
      //   "img": "https://lh6.googleusercontent.com/1meQFwbZd5mZjBzUXeq-VxLzZvHHa5yAkc1NnAvjw5OvuXL5sJZ8foAs8zZpUcFsLPSGiNuzRL-9f4c05WQOIUA=w1280"
      // },
      // {
      //   "title": "Natalya Vodyanova",
      //   "summary": "former Ukraine Minister of Finance",
      //   "img": "https://lh5.googleusercontent.com/PP40cMN22peIbuYskueOIs_3sReK96TIewnNgjRqBcBXy2I0PAk9mrwUTCEKrPF2V-QhqsoDnH6AStg8ix-N0qxl-2n8QaPeJfcVLMjr5m3jyCgteKUVtYHOD9k08ifs=w1280"
      // },
      // {
      //   "title": "Lenna Koszarny",
      //   "summary": "Model, philanthropist, entrepreneur, and public speaker.",
      //   "img": "https://lh4.googleusercontent.com/DPBNIe7edmnhFB5SkfaiTiFRvDk1UplXC4js-02xOypG_AmFwWoiVARqNlDjtZzp3f8J_whAEsYJGjM2jaoZSB5ktCqVXjl-fmpOsfeMWDDQWwg5nRYzCcMERqopnOKfFA=w1280"
      // },
      // {
      //   "title": "Olga Dergunova",
      //   "summary": "Founding Partner and CEO at Horizon Capital",
      //   "img": "https://lh4.googleusercontent.com/Awil5WtTqTc233HSua6fJwyiZvyF_622b-oH07u00Y_I-Llnc7T7Wz-g_JXo4ezs0DqeYhQsRijQ652AiVh4UVt5y0l-OPJFCRitgQj15xaZXa4HVDPgb8fqxcSkPR6vbA=w1280"
      // },
      // {
      //   "title": "Arkadiy Dobkin",
      //   "summary": "Deputy President, VTB; Former CEO Microsoft RUS",
      //   "img": "https://lh5.googleusercontent.com/_5W6RdGqgqJSeO9xO_TgmNk1icZgRIs-fePA3tLFeIe1kGVkoCDHQnK6fMtwK7N-WEu9YlXZrT7C1V7mVdqHCyhb_g63VK-cSCvkpUlut7LiGd6fKHoMrAx4E5igCFCpyg=w1280"
      // },
      // {
      //   "title": "Andrei Sharonov",
      //   "summary": "Chairman and CEO, EPAM Systems",
      //   "img": "https://lh6.googleusercontent.com/HOOGXB05ZBKhVSs3hlSGtyb_1Ske-6ZA8U9geMfHpPxFCHttPXpKOF4C4g-oUQsxDk3yfVidWlZVxlA5uxdRfBrwF2Oxzo9TDgASeVAH57Z6OYL7aJ0H3m4emb_A4i99CQ=w1280"
      // },
      // {
      //   "title": "Ilya Strebulaev",
      //   "summary": "President of SKOLKOVO",
      //   "img": "https://lh5.googleusercontent.com/cjGkN2odlyLChEZE10X_rxzXX1__O3UiSen1IKwG1HAzDtRdrsNjVJuIiC654skg5krOE0usuFRsUAyMeCbzRi620pWr-gcjnEivqiAydKwV42DJG7lOjZON0hocriKNYw=w1280"
      // },
      // {
      //   "title": "Yan Leshinsky",
      //   "summary": "Professor Stanford GSB",
      //   "img": "https://lh5.googleusercontent.com/u5oInyEl3QazUmnkgPDxQnAOh3RBYkLolJRSsZTuzRKqMmM9ZsiFdk_GAxPD6yAYWH_WFAXeP6FLydDdmDb9kTqaZdEFskiTG4MC7pNuRR1Jjs2I68VZxbuDfspZm87-kA=w1280"
      // },
      // {
      //   "title": "Steven Hellman",
      //   "summary": "Vice President, Redshift at AWS; Former CEO, Yandex.Cloud",
      //   "img": "https://lh3.googleusercontent.com/9Pb9qpYp1jG50E-Fsz22b0F3ezQzFeD5ITCYP_l4zX7YSpGIkB1X3ouwSPa4JeoCifJNgl2M4ZHAEFjMux9giXU=w1280"
      // },
      // {
      //   "title": "Mikhail Khodorkovsky",
      //   "summary": "MD at Credit Suisse, ex-CEO Credit Suisse Russia & CIS",
      //   "img": "https://lh5.googleusercontent.com/3p9qcJDvvgzCMQ0WndEb79yGgpQNBxJmuqLzOc8hrMu7TYEg-tAqqWcLWmS_gny6d6eL6MRLfxKT_y7d-5Lnl6qCdElS7xa25yHlqNjtw-HBKQpz63IXtkbcclCHFQ9t=w1280"
      // },
      // {
      //   "title": "Tanya Landwehr",
      //   "summary": "Chairman & CEO of Yukos",
      //   "img": "https://lh4.googleusercontent.com/21h9rZRH0NxlZgZrC4JAundWhgGiafW_BtJxkRElGXUgT_nZIV1xd7JepH3RydQKX0prEp1eKDhaJIFe0D8mfzE=w1280"
      // },
      // {
      //   "title": "Vasily Nikolaev",
      //   "summary": "Co-Founder and CEO, Fosun Eurasia; Insead '99",
      //   "img": "https://lh4.googleusercontent.com/_rMHg2uxSgvGiLlZ9tYzrL66Qs_Nx9u6CU5uSxteysoAxgokV3EyqnLPwEYfrfs3px4gi4hhX8nltVevdfFe3QA=w1280"
      // },
      // {
      //   "title": "Olga Selivanova-Shoff",
      //   "summary": "CEO at AI start-up Braintree, MBA at IESE",
      //   "img": "https://lh5.googleusercontent.com/T189sVlbRlYURGQRYW2mwxExNJ8RAm1bactu85U61xDxdCw-khklq7dMzXwnWjDdqLFDjR2rHshkuJYtyixEid6DCBjGpdDb5jtPJOP4d9EC9tdUvUUuwfAEwMScLotxsg=w1280"
      // },
      // {
      //   "title": "Garry Kasparov",
      //   "summary": "CEO at Magnum Hunt Executive Search",
      //   "img": "https://lh6.googleusercontent.com/0NYSTrcjxpt1FJ4ly5RsB_tkaXXZmjUUzLe3dlWDZ2FwWrFR_c5bwmOlY-pNYhRCGqAyIsPHwJkDu5ABu1EfRNCacYyfztOXm9zOQsvyum6eEwXdbeJ0E2kIg4R3cReskA=w1280"
      // },
      // {
      //   "title": "Ilya Fushman",
      //   "summary": "Grandmaster",
      //   "img": "https://lh6.googleusercontent.com/5G4vqMPf-MFkH6IJ9e8vkK2ga4d-GVSbI5IFMdoyZVMovS6nYZKz2r2-LSeUSUDDEFdVX0_DILnvFdSVrfycCKc=w1280"
      // },
      // {
      //   "title": "Olga Paskina",
      //   "summary": "Partner at Kleiner Perkins",
      //   "img": "https://lh4.googleusercontent.com/Ktayy8RJVH9MHSzYdxY9K37Mj_EjRn9VFuMal_HVAjoOXNIh2I27IpMpzQEMD_-CXIOR8x2ckgoDwZFSvq7uImwkKbla6m1wrsGnFJsQErXjUTtM6JMIdAtNlGVTsPe-eA=w1280"
      // },
      // {
      //   "title": "Victoria Pavlova",
      //   "summary": "ex-CEO NMG (Channel One, Ren TV, STS and others), Wharton '08",
      //   "img": "https://lh6.googleusercontent.com/CPFZkHQhkm6fsSr0kR9IuL7nwGncpNN4-pTwBZI_E4ph6yv08U8-k1GKcPHIDJgCJHXtieic9hK0UC0m8L7uq3y32_G8E2yEFHxr-cRx0Xc_wpLl_9a_P8hi-TDYRiLMwg=w1280"
      // },
      // {
      //   "title": "Mikhail Kokorich",
      //   "summary": "Mastercard, Global head of marketing",
      //   "img": "https://lh6.googleusercontent.com/sZZMQUDGdghc1SCPNUIsL2J0GVRMJOMljv1HqVY9Nojh1uOxSq7rINMP5sIVnf3oZhSd8IK2Zv64ZdiypjkiLbQfFmlUW0-y6LSjFddsglS0HCrGcqTTj5rQrn1WB3XV0A=w1280"
      // },
      // {
      //   "title": "Michael McFaul",
      //   "summary": "founder of Momentus Space, serial entrepreneur",
      //   "img": "https://lh5.googleusercontent.com/CKUvzrkerbOU3PuILZhEUzUQtCUQqRb6_shjY2ZpX5m2S7WyMefSfuxfvo7Mbdc6-otcnEya2t353zI879U-tqUXAjNpOo9njQnzTfZRhHGxv2Qnid1hkBBSwumcHik5kQ=w1280"
      // },
      // {
      //   "title": "Masha Gordon",
      //   "summary": "Director of the Freeman Spogli Institute for International Studies",
      //   "img": "https://lh3.googleusercontent.com/6LP3-CxJ7RSTZGMKdpdxKuO7k-BoTMeN4EXwnZWbsQ5bbNZa_hNQs_YHMsq9KbTZ6uwv2hBKsnOv9DPLP6kiUpYkCxpSiE1qYnvC8ShDU-mEnMyGrU-6f4Noj_1TemlOew=w1280"
      // },
      // {
      //   "title": "Natalia Sindeeva",
      //   "summary": "Detskiy Mir, Chairwoman, ex-GS, PIMCO",
      //   "img": "https://lh4.googleusercontent.com/e9wYuzI_4r0-UNDc6xknjjUyBHbYUlEJ8ZKr90gFCNzT6ca3-g6yHCMk2v_vGtkeaZYtKYvXDSV95-4L6WJ4h4eI93S-KfzXrBdSeoesDIL7LwD1wYWTSgrPGYvQyXABtg=w1280"
      // },
    ];
    for(const speaker of speakers){
      this.db.collection('speakers').add(speaker).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      // console.log(speaker);
    }

  }

  // print(){
  //   console.log(this.item$);
  // }
  // load(page: number, pageSize: number): Observable<NewsPost[]> {
  //   const startIndex = ((page - 1) % TOTAL_PAGES) * pageSize;
  //
  //   return this.http
  //     .get<NewsPost[]>('https://akveo.github.io/nebular/assets/data/news.json')
  //     .pipe(
  //       map(news => news.splice(startIndex, pageSize)),
  //       delay(1500),
  //     );
  // }
}
