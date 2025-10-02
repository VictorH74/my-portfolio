import { adminDb } from '@/lib/firebase/admin';

async function updateQueryBatch(
    db: FirebaseFirestore.Firestore,
    query: FirebaseFirestore.Query<
        FirebaseFirestore.DocumentData,
        FirebaseFirestore.DocumentData
    >,
    techId: string,
    resolve: (value: void | PromiseLike<void>) => void
) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        resolve();
        return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        const techList = doc.data().technologies as string[];
        batch.update(doc.ref, {
            technologies: techList.filter((t) => t != techId),
        });
    });
    await batch.commit();

    process.nextTick(() => {
        updateQueryBatch(db, query, techId, resolve);
    });
}

export async function PUT(req: Request) {
    const { techId } = await req.json();

    const collectionRef = adminDb.collection('projects');
    const query = collectionRef.where('technologies', 'array-contains', techId);

    await new Promise<void>((resolve, reject) => {
        updateQueryBatch(adminDb, query, techId, resolve).catch(reject);
    });

    return new Response('success');
}
