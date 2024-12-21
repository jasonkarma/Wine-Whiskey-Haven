import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { auth, db, storage } from './config';

// Authentication Services
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      displayName,
      email,
      createdAt: new Date().toISOString(),
      wishlist: [],
      cart: [],
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (!userDoc.exists()) {
      // Create user document if it doesn't exist
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        createdAt: new Date().toISOString(),
        wishlist: [],
        cart: [],
      });
    }
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Firestore Services
export const addProduct = async (productData) => {
  try {
    const docRef = doc(collection(db, 'products'));
    await setDoc(docRef, {
      ...productData,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (category, sortBy = 'createdAt', sortOrder = 'desc', itemLimit = 50) => {
  try {
    let q = collection(db, 'products');
    if (category) {
      q = query(q, where('category', '==', category));
    }
    q = query(q, orderBy(sortBy, sortOrder), limit(itemLimit));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, updateData) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, updateData);
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    throw error;
  }
};

// Storage Services
export const uploadProductImage = async (file, productId) => {
  try {
    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    throw error;
  }
};

export const deleteProductImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    throw error;
  }
};

// User Data Services
export const updateUserProfile = async (userId, updateData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, updateData);
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

// Cart Services
export const updateCart = async (userId, cartItems) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { cart: cartItems });
  } catch (error) {
    throw error;
  }
};

// Wishlist Services
export const updateWishlist = async (userId, wishlistItems) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { wishlist: wishlistItems });
  } catch (error) {
    throw error;
  }
};

// Update product images
export const updateProductImages = async () => {
  try {
    const products = await getProducts();
    
    // Specific image mappings for products
    const productImageMap = {
      // Whiskey mappings
      'jack daniels': 'https://www.oaks.delivery/wp-content/uploads/Jack-Daniels-Honey-Whiskey-1-1600x900-1-1200x900-cropped.webp',
      'jameson': 'https://dayspringshop.com/wp-content/uploads/2024/05/DSC4620.jpg',
      'macallan': 'https://dayspringshop.com/wp-content/uploads/2024/05/DSC4620.jpg',
      'glenfiddich': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Y_uN75UNuotchTBNWdg3JX09qidhOZZ8gg&s',
      'johnnie walker': 'https://www.medoc.com.tw/web/wp-content/uploads/shop/product/WKJW3570.jpg',
      'crown royal': 'https://media.diageocms.com/media/ayimttpi/crownroyal_newfeature1.jpg',
      'chivas regal': 'https://www.wine0222.com/upload/20230501123432jqa0m11699869833qee1723109714ajp.png',
      'highland park': 'https://img.everrich.com/img/p/5/7/9/3/8/57938-large_default.jpg',
      'glenlivet': 'https://drwine1984.com/wp-content/uploads/2021/12/Glenlivet-Master-Distillers-Reserve.jpg',
      'lagavulin': 'https://www.my9.com.tw/cdn/shop/files/M14103-2_33b90fb7-b0bd-4fe6-8745-08867b2112a0_2000x.png?v=1688546715',

      // Wine mappings
      'provence rosé': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs__Ry9Bkyk5ahceL5cnAPG1zMLVU2v1qZnA&s',
      'cabernet': 'https://cdn.shopify.com/s/files/1/0028/9669/1264/files/I26705-10_900x.png?v=1721295770',
      'merlot': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwZ0lH8nmKTkXxynhrrqyFImv9s2RKb_2PoA&s',
      'pinot noir': 'https://www.maset.com/cdnassets/products/red-wines/lg/bottle/pinot-noir-lg-1.png',
      'chardonnay': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy3q49QVteGkdGjh5lL2JpTj_wFo6d10Xwhg&s',
      'sauvignon blanc': 'https://www.sauvignonjohn.com/cdn/shop/products/image_65e4f397-1371-472c-a123-075ddd391ca0_1200x1200.png?v=1661873388',
      'riesling': 'https://www.medoc.com.tw/web/wp-content/uploads/%E5%BE%B7%E5%9C%8B_Fritz-Haag_Brauneberger-Riesling-Trocken-J-1G_%E6%A3%95%E5%B1%B1%E4%B8%80%E7%B4%9A%E5%9C%92%E9%BA%97%E7%B5%B2%E7%8E%B2%E4%B8%8D%E7%94%9C%E7%99%BD%E9%85%92.png',
      'syrah': 'https://vineum.tw/wp-content/uploads/2023/08/%E6%9C%AA%E5%91%BD%E5%90%8D-3-2.png',
      'malbec': 'https://i.ibb.co/bRZ6P0Q/malbec.png',
      'zinfandel': 'https://i.ibb.co/xGV8ZQM/zinfandel.png',
      'prosecco': 'https://i.ibb.co/C6v0XZv/prosecco.png'
    };

    // Default category images
    const defaultImageUrls = {
      whiskey: 'https://cdn1.cybassets.com/media/W1siZiIsIjEzODc5L3Byb2R1Y3RzLzM1MjU0MzY4LzE2MzU4NDc0NThfYTEwM2I5NjI1ZmQ3N2JmZDdjNWMuanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=9c0a7cef0089130b',
      wine: 'https://vineum.tw/wp-content/uploads/2023/08/%E6%9C%AA%E5%91%BD%E5%90%8D-3-2.png'
    };

    const updates = [];

    for (const product of products) {
      try {
        const docRef = doc(db, 'products', product.id);
        const docSnap = await getDoc(docRef);
        
        // Keep existing image URL if it exists and is valid
        let imageUrl = product.imageUrl;
        
        // If no image URL or need to update, find appropriate one
        if (!imageUrl) {
          const productNameLower = product.name.toLowerCase();
          
          // Try to find matching image URL
          for (const [key, url] of Object.entries(productImageMap)) {
            if (productNameLower.includes(key)) {
              imageUrl = url;
              break;
            }
          }
          
          // Use default category image if no specific match found
          if (!imageUrl) {
            imageUrl = defaultImageUrls[product.category] || defaultImageUrls.wine;
          }
        }

        if (docSnap.exists()) {
          updates.push(
            updateDoc(docRef, {
              imageUrl: imageUrl
            })
          );
        } else {
          // If document doesn't exist, create it with all product data
          updates.push(
            setDoc(docRef, {
              ...product,
              imageUrl: imageUrl
            })
          );
        }
        
        console.log(`Updated/created product ${product.id} with image: ${imageUrl}`);
      } catch (error) {
        console.warn(`Error updating product ${product.id}:`, error);
      }
    }

    await Promise.all(updates);
    console.log('Product images updated successfully');
  } catch (error) {
    console.error('Error updating product images:', error);
    throw error;
  }
};

// Clean up duplicate products
export const cleanupDuplicateProducts = async () => {
  try {
    const products = await getProducts();
    const uniqueProducts = new Map();
    const duplicates = [];

    // Find duplicates
    products.forEach(product => {
      const key = product.id;
      if (uniqueProducts.has(key)) {
        duplicates.push(product);
      } else {
        uniqueProducts.set(key, product);
      }
    });

    // Delete duplicates
    for (const duplicate of duplicates) {
      await deleteProduct(duplicate.id);
    }

    console.log(`Cleaned up ${duplicates.length} duplicate products`);
    return duplicates.length;
  } catch (error) {
    console.error('Error cleaning up duplicates:', error);
    throw error;
  }
};
