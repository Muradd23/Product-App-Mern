// Este método se utiliza para crear un store (almacén) donde se puede gestionar el estado global de la aplicación.
import {create} from "zustand"
// El método create de Zustand recibe una función que devuelve un objeto. 
// Este objeto contiene el estado inicial (products) y las funciones para actualizar ese estado (setProducts).
export const useProductStore = create((set)=>({
    // Aquí se define el estado inicial del store. 
    // En este caso, el estado inicial es un array vacío llamado products. 
    // Este arrat se para almacenar una lista de productos.
    products:[],
    //Esta (setProducts) es una función que permite actualizar el estado del store. 
    //Recibe un argumento (products) y lo usa para actualizar el estado mediante la función set.
    //set({ products }) actualiza el estado del store reemplazando el valor actual de products con el nuevo valor proporcionado
    setProducts: (products) => set({products}),
    //Se define la funcion createProduct dentro del store
    createProduct: async (newProduct) =>{
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success:false,msg:"Please fill in all fields"}
        }
        //Llamada a la api
        const res = await fetch("/api/products", {
            //Especifica que esta es una solicitud POST (para crear un nuevo recurso).
            method: "POST",
            //Define las cabeceras de la solicitud.
            //"Content-Type":"application/json": 
            // Indica que el cuerpo de la solicitud está en formato JSON.
            headers:{
                "Content-Type":"application/json",
            },
            //Convierte el objeto newProduct a una cadena JSON y lo envía como el cuerpo de la solicitud.
            body: JSON.stringify(newProduct),
        });

        if (!res.ok) {
            const errorText = await res.text(); // Lee el cuerpo como texto plano
            console.error("Error from server:", errorText);
            return { success: false, msg: "Server error: " + errorText };
        }


        //Después de recibir la respuesta del servidor, s
        //se convierte el cuerpo de la respuesta a un objeto JavaScript usando res.json().
        //se almacena en la var data
        const data = await res.json();
        //con set se actualiza el estado de la store
        //state es el estado actual de la store
        //state.products es el estado actual
        //[...state.products,data.data] crea un nuevo array con los productos existentes (state.products)
        //mas el nuevo producto (data.data)
        set((state)=>({products:[...state.products, data.data]}))
        //retorna un obj
        return {success:true,msg:"Product created succesfully"}
        
    },
    //funcion para traer los productos
    fetchProducts: async ()=>{
        const res = await fetch("/api/products")
        const data = await res.json()
        set({products:data.data})
    },
    //funcion para eliminar producto
    deleteProducts: async (id)=>{
        const res = await fetch(`/api/products/${id}`,{
            method:"DELETE",
        })
        const data = await res.json()
        if(!data.success){
            return {success:false,msg: data.msg}
        }
        set(state => ({products: state.products.filter(product => product._id !== id)}))
        return {success:true,msg: data.msg}
    },
    //funcion para actualizar producto
    updateProduct: async (id,updatedProduct)=>{
        const res = await fetch(`/api/products/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedProduct),
        })
        const data = await res.json()
        if(!data.success){
            //retornar siempre si salio mal
            return {success:false,msg: data.msg}
        }
        set((state) => ({
            products: state.products.map((product) => 
              (product._id === id ? data.data : product)
            )
          }));
        //retornar siempre si salio bien
        return {success:true,msg: data.msg}
    }
}))