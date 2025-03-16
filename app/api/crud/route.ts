import client from "@/lib/appwrite_client";
import { Databases, ID, Query } from "appwrite";
import { NextResponse } from "next/server";

const database = new Databases(client);

// create
async function createProducts(data: {
  name: string;
  category: string;
  color: string;
  price: number;
}) {
  try {
    const response = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_TABLE_ID as string,
      ID.unique(),
      data
    );
    return response;
  } catch (error) {
    console.error("Gagal membuat produk", error);
    throw new Error("Gagal membuat produk baru");
  }
}

// fetch
async function fetchProducts() {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID as string,
      process.env.NEXT_PUBLIC_TABLE_ID as string,
      [Query.orderDesc("$createdAt")]
    );
    return response.documents;
  } catch (error) {
    console.error("Gagal fetch produk", error);
    throw new Error("Gagal fetch produk baru");
  }
}

// create post
export async function POST(req: Request) {
  try {
    const { name, category, price, color } = await req.json();
    const data = { name, category, color, price };
    await createProducts(data);
    return NextResponse.json({ message: "Produk berhasil dibuat." });
  } catch (error) {
    console.error("Gagal membuat produk.", error);
    return NextResponse.json(
      { message: "Gagal membuat produk." },
      { status: 500 }
    );
  }
}

// list gate
export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Gagal fetch produk.", error);
    return NextResponse.json(
      { message: "Gagal fetch produk." },
      { status: 500 }
    );
  }
}
