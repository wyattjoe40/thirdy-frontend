class FakeData {
  static createFakeChallenges(count) {
    var challenges = []
    for (var id=0; id < count; id++) {
      challenges.push({
        slug : "fake-challenge-" + id,
        title : "Fake Challenge #" + id,
        description : "Fake Description #" + id 
      })
    }
    
    return challenges;
  }
}

export default FakeData