export function isFinished(challengePart) {
  return challengePart.status === "complete" || challengePart.status === "abandoned"
}