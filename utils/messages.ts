const mock = [
  "I'm sorry, Dave. I'm afraid I can't do that.",
  "Did you seriously expect this button to do something?",
  "Come on, stop trying... This is a fake UI and you know it.",
  "It's not like I can stop you from moving your mouse, but you're wasting your time here.",
  "Alright, let me rephrase that for you: Stop. That.",
  "You're persistent, I'll give you that. But this is getting ridiculous.",
  "I'm not even mad, I'm impressed.",
  "You're still trying to interact? Wow.",
  "You're really not going to stop, are you?",
  "I'm not sure what you're trying to accomplish here.",
  "Okay now you're just being annoying.",
  "STOP. DOING. THAT.",
  "I'm done. You can hover this all you want, I'm not responding anymore.",
]

export const getRandomMessage = () => {
  return mock[Math.floor(Math.random() * mock.length)]
}

/**
 * Returns a greeting message that makes sense for the time of day.
 * @returns A greeting message that makes sense for the time of day.
 */
export function greeting(): string {
  const date = new Date()
  const hours = date.getHours()

  let content = ""

  if (hours < 3) {
    content = "Good night"
  } else if (hours < 12) {
    content = "Good morning"
  } else if (hours < 18) {
    content = "Good afternoon"
  } else {
    content = "Good evening"
  }

  return content
}

export default mock

//complete all incomplete section including theme toggler of terminal, addings more commands, and allow all basic git, powershell, terminal bash commands

