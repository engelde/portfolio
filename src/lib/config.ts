export const config = {
  app: {
    name: 'David Engel',
    author: 'David Engel',
    description:
      "I am a full stack software engineer with more than 10 years of experience delivering successful projects to senior leadership, clients, and investors. I have a Master's in Software Engineering from DePaul University and I currently enjoy working with TypeScript, React, Next.js, Python, Node, Docker and AWS, as well as exploring the possibilities of frontier AI models and machine learning.",
    version: process.env.NEXT_PUBLIC_VERSION || '',
    environment: process.env.NODE_ENV || '',
  },
  forms: {
    pipeRoomMessage: {
      action: process.env.NEXT_PUBLIC_PIPE_ROOM_MESSAGE_FORM_ACTION || '',
      emailField: process.env.NEXT_PUBLIC_PIPE_ROOM_MESSAGE_EMAIL_FIELD || '',
      nameField: process.env.NEXT_PUBLIC_PIPE_ROOM_MESSAGE_NAME_FIELD || '',
      messageField: process.env.NEXT_PUBLIC_PIPE_ROOM_MESSAGE_MESSAGE_FIELD || '',
    },
  },
}
