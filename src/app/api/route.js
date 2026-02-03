import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
