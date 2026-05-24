import { Component, OnInit, signal } from '@angular/core';
import englishAffirmations from '../affirmations/en.json';

const SHOWN_AFFIRMATIONS_KEY = 'shown_affirmations';

@Component({
  selector: 'app-affirmation-card',
  standalone: true,
  imports: [],
  templateUrl: './pregnancy-affirmations-card.html',
  styleUrl: './pregnancy-affirmations-card.css'
})
export class AffirmationCardComponent implements OnInit {
  currentAffirmation = signal<string>('');
  private affirmations = englishAffirmations;

  ngOnInit(): void {
    this.generateNextAffirmation();
  }

  generateNextAffirmation(): void {
    let shownIndices: number[] = JSON.parse(localStorage.getItem(SHOWN_AFFIRMATIONS_KEY) || '[]');

    if (shownIndices.length >= this.affirmations.length) {
      shownIndices = [];
    }

    const availableIndices = this.affirmations
      .map((_, index) => index)
      .filter(index => !shownIndices.includes(index));

    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const nextIndex = availableIndices[randomIndex];

    this.currentAffirmation.set(this.affirmations[nextIndex]);

    shownIndices.push(nextIndex);
    localStorage.setItem(SHOWN_AFFIRMATIONS_KEY, JSON.stringify(shownIndices));
  }
}
