import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

//buat fetch
async function fetchProducts(id: string) {
  try {
    const products = await database.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_TABLE_ID as string,
      id
    );
    return products;
  } catch (error) {
    console.error("Gagal fetch produk", error);
    throw new Error("Gagal fetch produk");
  }
}

//buat update
async function updateProducts(
  id: string,
  data: {
    name: string;
    category: string;
    price: BigInteger;
    color: string;
  }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_TABLE_ID as string,
      id,
      data
    );
    return response;
  } catch (error) {
    console.error("Gagal mengupdate produk", error);
    throw new Error("Gagal mengupdate produk");
  }
}

//buat delete
async function deleteProducts(id: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_TABLE_ID as string,
      id
    );
    return response;
  } catch (error) {
    console.error("Gagal menghapus produk", error);
    throw new Error("Gagal menghapus produk");
  }
}

//buat get
export async function GET(
  rqeuest: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const products = await fetchProducts(id);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Gagal fetch produk.", error);
    return NextResponse.json(
      { message: "Gagal fetch produk." },
      { status: 500 }
    );
  }
}

//buat delete
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await deleteProducts(id);
    return NextResponse.json({
      message: "Berhasil hapus produk",
    });
  } catch (error) {
    console.error("Gagal hapus produk", error);
    return NextResponse.json(
      {
        message: "Gagal menghapus produk.",
      },
      { status: 500 }
    );
  }
}

//buat update
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const products = await req.json();
    await updateProducts(id, products);
    return NextResponse.json({
      message: "Berhasil update produk.",
    });
  } catch (error) {
    console.error("Gagal update produk", error);
    return NextResponse.json(
      {
        message: "Gagal update produk.",
      },
      { status: 500 }
    );
  }
}
