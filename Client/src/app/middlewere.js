import { NextResponse } from 'next/server'


export function middlewere (req) {
    const user = "admin"
    if (!user){
        return NextResponse.redirect(new URL("/allproducts/none", req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["admin", "user"]
}