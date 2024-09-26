export const translations = {
  eng: {
    header: 'SIQ Bots',
    placeholder: 'Your query',
    sendButton: 'Send',
    initialMessage:
      'Welcome to Paint Assistence! You can choose one of the following options or ask me anything regarding home renovation or painting! I will be glad to help.🎨',
    report: 'Feedback',
    reportTitle: 'Feedback',
    reportInstructions:
      'Please report all wrong or inaccurate bot responses. Please describe what the issue is and how did you expect the bot to respond. Positive feedback is also appreciated!',
    sendReportButton: 'Send report',
    closeReportButton: 'Close',
    reportTextPlaceholder: 'Describe the situation here ...',
    initial_buttons: [
      'normal',
      'Help me find the right paint for my project',
      'Find details about a specific product (such ascoverage, colours, pricing, etc.)',
      'Guide me through the steps of painting with Jupol Gold',
      'Help me choose the right color for my room',
      'Calculate the amount of paint needed for my project',
    ],
  },
  svn: {
    header: 'Boti SIQ',
    placeholder: 'Vaše vprašanje',
    sendButton: 'Pošlji',
    initialMessage:
      'Sem robot strokovnjak za prenovo doma in JUB pomoč strankam. Kako vam lahko danes pomagam?',
    report: 'Povratne informacije',
    reportTitle: 'Pošlji povratno informacijo',
    reportInstructions:
      'Ta obrazec uporabite za prijavo zavajujočih, napačnih ali pokvarjenih pogovorov z robotom razvijalcem. Opišite težavo v okvirček spodaj in stisnite Pošlji. Celoten trenuten pogovor, prikazan zgoraj, bo pripet vaši prijavi.',
    sendReportButton: 'Pošlji prijavo',
    closeReportButton: 'blizu',
    reportTextPlaceholder: 'Tu opišite vašo pripombo ...',
    initial_buttons: [
      'normal',
      'Pomagaj mi poiskati pravo barvo za moj projekt.',
      'Poišči podrobnosti enega izdelka (npr. pokrivnost, barve, cena, itd.)',
      'Pelji me čez korake pri pleskanju z Jupol Gold',
      'Pomagaj mi izbrati pravi odtenek za mojo sobo.',
      'Izračunaj količino barve za moj projekt',
    ],
  },
}

export type ITranslation = typeof translations.eng
