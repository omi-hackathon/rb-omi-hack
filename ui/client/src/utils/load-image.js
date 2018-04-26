import CreditCardIcon from 'images/card-icon.jpg';

export default function loadImage(name) {
    switch (name) {
        case 'card-icon.jpg':
            return CreditCardIcon;
        default:
            console.error('Cannot load image:', name);
            return '';
    }
}
