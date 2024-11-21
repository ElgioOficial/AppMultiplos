import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userNumber: number = 0;  // Número ingresado por el usuario
  numbers: number[] = [];  // Lista de números entre 0 y el número ingresado

  constructor(private firestore: Firestore) {}

  // Función que encuentra los múltiplos
  findMultiples() {
    if (this.userNumber !== null && this.userNumber >= 0) {
      // Generar la lista de números desde 0 hasta el número ingresado
      this.numbers = Array.from({ length: this.userNumber + 1 }, (_, i) => i);

      // Guardar en Firebase
      this.saveToFirestore(this.userNumber, this.numbers);
    }
  }

  // Obtener el color basado en los múltiplos
  getColor(number: number): string {
    if (number % 3 === 0 && number % 5 === 0 && number % 7 === 0) {
      return 'green'; // Prioridad múltiplo de 3
    } else if (number % 3 === 0) {
      return 'green'; // Múltiplos de 3
    } else if (number % 5 === 0) {
      return 'red'; // Múltiplos de 5
    } else if (number % 7 === 0) {
      return 'blue'; // Múltiplos de 7
    } else {
      return 'black'; // No tiene múltiplo
    }
  }

  // Guardar en Firestore
  async saveToFirestore(userNumber: number, result: number[]) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'calculations'), {
        input: userNumber,
        result: result
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
