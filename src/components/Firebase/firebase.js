import firebaseConfig from "./config"

class Firebase {
  constructor(app) {
    if (!firebaseInstance) {
      app.initializeApp(firebaseConfig)

      this.auth = app.auth()
      this.db = app.firestore()
      this.functions = app.functions()
      this.storage = app.storage()
    }
  }

  async login({ email, password }) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  async logout() {
    await this.auth.signOut()
  }
  async createAuthor({ authorName }) {
    const createAuthorFxn = this.functions.httpsCallable("createAuthor")
    return createAuthorFxn({ authorName })
  }
  async createBook({ bookName, authorId, bookCover, summary }) {
    const createBookFxn = this.functions.httpsCallable("createBook")
    return createBookFxn({ bookName, authorId, bookCover, summary })
  }
  async register({ email, password, username }) {
    await this.auth.createUserWithEmailAndPassword(email, password)
    const createProfileFxn = this.functions.httpsCallable("createPublicProfile")
    return createProfileFxn({ username })
  }
  subscribeToBookComments({ bookId, onSnapshot }) {
    const bookRef = this.db.collection("books").doc(bookId)
    return this.db
      .collection("comments")
      .where("book", "==", bookRef)
      .orderBy("dateCreated", "desc")
      .onSnapshot(onSnapshot)
  }
  async getUserProfile({ userId, onSnapshot }) {
    return this.db
      .collection("publicProfiles")
      .where("userId", "==", userId)
      .limit(1)
      .onSnapshot(onSnapshot)
  }
  async getAuthors() {
    return this.db.collection("authors").get()
  }
  async postComment({ text, bookId }) {
    const postCommentFxn = this.functions.httpsCallable("postComment")
    return postCommentFxn({ bookId, text })
  }
}

let firebaseInstance

function getFirebaseInstance(app) {
  if (!firebaseInstance && app) {
    firebaseInstance = new Firebase(app)
    return firebaseInstance
  } else if (firebaseInstance) {
    return firebaseInstance
  } else {
    return null
  }
}

export default getFirebaseInstance
