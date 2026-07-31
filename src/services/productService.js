import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'

const productsRef = collection(db, 'products')

export async function getProducts() {
  const snapshot = await getDocs(query(productsRef, orderBy('id')))
  return snapshot.docs.map((entry) => entry.data())
}

export async function getFeaturedProducts() {
  const snapshot = await getDocs(query(productsRef, orderBy('id')))
  return snapshot.docs.map((entry) => entry.data()).filter((product) => product.featured)
}

export async function getProductById(id) {
  const snapshot = await getDoc(doc(db, 'products', String(id)))
  return snapshot.exists() ? snapshot.data() : null
}
