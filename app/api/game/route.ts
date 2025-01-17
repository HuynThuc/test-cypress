import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE() {
  try {
    const buildPath = path.join(process.cwd(), 'public/game/Build');

    fs.rmSync(buildPath, { recursive: true, force: true });

    return NextResponse.json({
      code: 200,
      message: 'Files deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: 'Error deleting files', error },
      { status: 500 },
    );
  }
}
