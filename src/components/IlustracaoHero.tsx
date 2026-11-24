export function IlustracaoHero() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      preserveAspectRatio="xMidYMid slice"
      className="hero__svg"
      role="img"
      aria-label="Ilustração de uma mulher de perfil, de olhos fechados, levando suavemente o dedo indicador aos lábios."
    >
      <defs>
        <linearGradient id="hero-ilustracao-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8A3643" />
          <stop offset="1" stopColor="#5E1F2A" />
        </linearGradient>
      </defs>

      <rect width="1024" height="1024" fill="url(#hero-ilustracao-bg)" />
      <circle className="ilustracao__halo" cx="500" cy="480" r="330" fill="#F6F1E9" opacity="0.09" />
      <path
        className="ilustracao__estrela"
        d="M795 260 L805.92 288.08 L834 299 L805.92 309.92 L795 338 L784.08 309.92 L756 299 L784.08 288.08 Z"
        fill="#F6F1E9"
      />

      {/* roupa */}
      <path
        d="M230 1024 C245 905 325 825 440 805 C500 828 560 832 610 818 C700 838 770 915 790 1024 Z"
        fill="#4F6B4A"
      />
      {/* pescoço */}
      <path d="M458 600 C464 685 460 750 442 815 C500 840 560 840 605 818 C582 762 576 705 582 650 Z" fill="#A86B4C" />
      {/* cabeça */}
      <path
        d="M560 285 C602 315 627 368 630 418 C630 433 626 443 628 453 C642 478 662 503 674 523 C678 533 670 543 654 543 C647 544 642 548 644 556 C652 557 666 561 671 572 C673 578 670 583 665 586 C672 590 672 601 661 605 C649 609 638 610 636 620 C634 627 633 632 636 638 C640 662 626 682 598 688 C562 694 522 684 494 660 L472 636 C402 598 362 520 382 420 C402 330 480 276 560 285 Z"
        fill="#C68863"
      />
      {/* cabelo */}
      <circle cx="360" cy="248" r="80" fill="#1E3A3E" />
      <path d="M310 285 C330 266 358 258 388 264" stroke="#7A2E3A" strokeWidth="16" fill="none" strokeLinecap="round" />
      <path
        d="M588 312 C592 250 540 206 462 208 C372 212 314 282 324 382 C332 462 372 532 418 588 C434 608 452 624 466 634 C470 590 468 540 476 500 C482 460 500 430 530 408 C556 390 576 360 588 312 Z"
        fill="#1E3A3E"
      />
      {/* orelha e brinco */}
      <ellipse cx="500" cy="470" rx="21" ry="34" fill="#C68863" />
      <path d="M503 452 C492 461 492 480 503 489" stroke="#A86B4C" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="497" cy="534" r="22" fill="none" stroke="#F6F1E9" strokeWidth="8" />
      {/* sobrancelha e olho fechado */}
      <path d="M574 414 C587 404 604 404 617 411" stroke="#1E3A3E" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M578 445 C588 455 602 456 611 447" stroke="#1E3A3E" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M586 454 l-4 9 M597 457 l-1 9" stroke="#1E3A3E" strokeWidth="4" strokeLinecap="round" />
      {/* bochecha */}
      <circle cx="585" cy="505" r="20" fill="#D9776E" opacity="0.35" />
      {/* braço */}
      <path d="M628 740 C680 780 740 880 792 1024 L690 1024 C662 930 632 850 596 780 Z" fill="#4F6B4A" />
      {/* canto da boca */}
      <path d="M665 586 C660 587 655 586 651 584" stroke="#A86B4C" strokeWidth="3.5" fill="none" strokeLinecap="round" />

      {/* mão animada: sobe suavemente até encostar o indicador nos lábios */}
      <g className="ilustracao__mao">
        <g stroke="#8E5539" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
          <path d="M666 734 C674 768 684 800 696 830 L756 812 C740 780 730 752 724 720 Z" fill="#C68863" />
          <path
            d="M680 656 C704 652 726 664 728 690 C730 716 716 738 690 742 C672 744 660 738 654 730 C644 728 642 712 652 708 C642 704 640 688 652 684 C642 680 644 662 660 660 C668 657 674 656 680 656 Z"
            fill="#D39A76"
          />
          <path
            d="M652 708 C662 708 670 710 677 713 M652 684 C662 684 670 686 677 689 M654 730 C662 731 668 733 674 736"
            fill="none"
          />
          <path d="M677 668 C675 630 672 592 674 560 C675 544 700 542 702 558 C706 590 708 628 710 668" fill="#D39A76" />
        </g>
        <path d="M680 560 C680 551 695 550 697 559 L697 572 C692 575 684 575 680 572 Z" fill="#E7BFA3" />
      </g>

      {/* sussurro "xiiiii" saindo suavemente dos lábios */}
      <g className="ilustracao__sussurro" aria-hidden="true">
        <g className="ilustracao__letra ilustracao__letra--1">
          <text x="734" y="576" fontSize="58" transform="rotate(-10 734 576)">
            x
          </text>
        </g>
        <g className="ilustracao__letra ilustracao__letra--2">
          <text x="774" y="556" fontSize="50" transform="rotate(-7 774 556)">
            i
          </text>
        </g>
        <g className="ilustracao__letra ilustracao__letra--3">
          <text x="802" y="538" fontSize="44" transform="rotate(-4 802 538)">
            i
          </text>
        </g>
        <g className="ilustracao__letra ilustracao__letra--4">
          <text x="829" y="520" fontSize="38" transform="rotate(-2 829 520)">
            i
          </text>
        </g>
        <g className="ilustracao__letra ilustracao__letra--5">
          <text x="854" y="504" fontSize="33" transform="rotate(1 854 504)">
            i
          </text>
        </g>
        <g className="ilustracao__letra ilustracao__letra--6">
          <text x="877" y="490" fontSize="28" transform="rotate(4 877 490)">
            i
          </text>
        </g>
      </g>
    </svg>
  );
}
