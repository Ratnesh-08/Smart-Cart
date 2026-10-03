// Smart Cart AI - Gemini API Abstraction Service
import { store } from '../store/state.js';

export async function askSmartCartAi(userQuery) {
  const context = store.getAiContext();
  const lower = userQuery.toLowerCase().trim();

  // If Gemini API endpoint / proxy key is configured in settings or environment, attempt call
  const apiKey = store.settings.supabaseKey !== 'anon-public-key-placeholder' ? store.settings.supabaseKey : null;

  if (apiKey && window.fetch) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Smart Cart AI for ${context.storeName}. Customer context: Cart items = ${JSON.stringify(context.items)}, spent = ₹${context.spent}, budgetCap = ₹${context.budgetCap}, remaining = ₹${context.remaining}. Query: "${userQuery}". Keep answer brief under 40 words with product recommendation if relevant.`
            }]
          }]
        })
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return {
          text: data.candidates[0].content.parts[0].text,
          productCard: findBestMatchingProduct(lower)
        };
      }
    } catch (err) {
      console.warn('Gemini API call fallback to local NLP engine:', err);
    }
  }

  // Intelligent Context-Aware Fallback Engine (No client secrets needed)
  return processLocalAiQuery(lower, context);
}

function processLocalAiQuery(query, ctx) {
  if (query.includes('rice') || query.includes('chawal')) {
    const rice = store.products.find(p => p.name.toLowerCase().includes('rice')) || store.products[5];
    return {
      text: `India Gate Basmati Rice is located in **${rice.locationName}**. Current price is ₹${rice.price.toFixed(2)}.`,
      productCard: rice,
      navTargetId: rice.id
    };
  }

  if (query.includes('spent') || query.includes('total') || query.includes('budget')) {
    return {
      text: `You've added **${ctx.itemCount} items** totaling **₹${ctx.spent.toFixed(2)}** (out of your ₹${ctx.budgetCap} budget cap). You have **₹${ctx.remaining.toFixed(2)} remaining**.`,
      productCard: null
    };
  }

  if (query.includes('300') || query.includes('budget') || query.includes('buy with')) {
    const affordable = store.products.filter(p => p.price <= 100);
    const prod = affordable[0] || store.products[0];
    return {
      text: `With ₹${ctx.remaining.toFixed(2)} remaining, you can buy **${prod.name}** for ₹${prod.price.toFixed(2)} at ${prod.locationName.split('–')[0]}!`,
      productCard: prod
    };
  }

  if (query.includes('shampoo') || query.includes('soap') || query.includes('dettol')) {
    const shampoo = store.products.find(p => p.category === 'Personal Care') || store.products[15];
    return {
      text: `Personal Care items are located in **${shampoo.locationName}**. ${shampoo.name} is ₹${shampoo.price.toFixed(2)}.`,
      productCard: shampoo,
      navTargetId: shampoo.id
    };
  }

  if (query.includes('milk') || query.includes('dahi') || query.includes('butter')) {
    const milk = store.products.find(p => p.category === 'Dairy') || store.products[0];
    return {
      text: `Dairy items like ${milk.name} are located in **Aisle 1 – Dairy (Shelf A)**. Price: ₹${milk.price.toFixed(2)}.`,
      productCard: milk,
      navTargetId: milk.id
    };
  }

  // Default smart suggestion based on budget
  const match = store.products.find(p => p.price <= ctx.remaining) || store.products[0];
  return {
    text: `Based on your remaining budget of ₹${ctx.remaining.toFixed(2)}, I recommend **${match.name}** at ${match.locationName}!`,
    productCard: match
  };
}

function findBestMatchingProduct(query) {
  return store.products.find(p => query.includes(p.name.toLowerCase()) || query.includes(p.category.toLowerCase())) || null;
}
