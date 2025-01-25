This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1. Sklonowanie repozytorium
Otwórz terminal w miejscu, gdzie chcesz skopiować projekt.

Wykonaj polecenie:

bash
Kopiuj
Edytuj
git clone <URL>
Zamień <URL> na adres URL swojego repozytorium GitHub (możesz go skopiować z przycisku Code w repozytorium na GitHub).
Przejdź do katalogu projektu:

bash
Kopiuj
Edytuj
cd <nazwa-repozytorium>
2. Zainstalowanie zależności
Upewnij się, że na komputerze jest zainstalowany Node.js (najlepiej w wersji LTS). Możesz pobrać go tutaj.
W katalogu projektu uruchom:
bash
Kopiuj
Edytuj
npm install
To polecenie zainstaluje wszystkie zależności wymienione w pliku package.json.
3. Konfiguracja zmiennych środowiskowych
Upewnij się, że plik .env nie został przesłany do repozytorium (zgodnie z plikiem .gitignore).

Ręcznie utwórz plik .env w katalogu głównym projektu i wklej do niego klucze Firebase. Powinny one wyglądać podobnie do:

plaintext
Kopiuj
Edytuj
NEXT_PUBLIC_API_KEY=your-firebase-api-key
NEXT_PUBLIC_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_APP_ID=your-app-id
NEXT_PUBLIC_MEASUREMENT_ID=your-measurement-id
Jeśli nie masz dostępu do zmiennych, poproś o nie administratora projektu.

4. Uruchomienie aplikacji
W terminalu uruchom projekt:
bash
Kopiuj
Edytuj
npm run dev
Aplikacja powinna być dostępna pod adresem:
arduino
Kopiuj
Edytuj
http://localhost:3000
