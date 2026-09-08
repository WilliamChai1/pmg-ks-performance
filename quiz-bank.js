// --- 50-QUESTION MASTER CLINICAL QUIZ BANK (WITH GLYCOWAY) ---
let HB_QUIZ_BANK = [
  { sku: "Nutribridge Suppflora", q: "What is the primary clinical benefit of Nutribridge Suppflora Probiotics?", options: ["Restore intestinal microflora & relieve bloating", "Suppress dry night cough", "Reduce elevated blood pressure", "Relieve acute migraine"], ans: 0, tip: "Suppflora restores gut microbiome balance, especially after antibiotics or for indigestion." },
  { sku: "Biowell B'llox", q: "Which House Brand product is recommended for rapid acid reflux and gastric discomfort?", options: ["Biowell B'llox Gastric Relief", "VK King Kong Balm", "Livemore Lutein & Bilberry", "JH Nutrition Omega-3"], ans: 0, tip: "B'llox buffers stomach acid and provides soothing mucoprotective gastric relief." },
  { sku: "Nutribridge Suppflora", q: "When a customer purchases oral antibiotics, what is the best House Brand cross-sell?", options: ["Nutribridge Suppflora Probiotics", "VK King Kong Balm", "Livemore Vitaglo Chewables", "Taiwan Herbal Ginger Patch"], ans: 0, tip: "Pairing antibiotics with Suppflora (2 hours apart) prevents antibiotic-associated diarrhea." },
  { sku: "Biowell B'llox", q: "A customer experiences post-meal fullness, acid regurgitation, and stomach burning. What to recommend?", options: ["Biowell B'llox Gastric Relief", "V-Infinity Vtrox Spray", "Arthri-Flex Glucosamine", "Livemore Lutein"], ans: 0, tip: "B'llox offers fast relief for upper digestive acid irritation and dyspepsia." },
  { sku: "Nutribridge Suppflora", q: "For irritable bowel symptoms and erratic stool consistency, how should Suppflora be taken?", options: ["1 sachet daily with room temperature water", "Boiled with hot water", "Taken only during fever", "Applied topically"], ans: 0, tip: "Never mix probiotics with hot water (>40°C) as heat destroys live cultures." },
  { sku: "Biowell B'llox", q: "Which active mechanism allows Biowell B'llox to relieve gastric irritation quickly?", options: ["Fast acid-neutralizing and mucosal-soothing action", "Blocking histamine in airways", "Thinning bronchial phlegm", "Stimulating intestinal peristalsis"], ans: 0, tip: "B'llox neutralizes localized acidity directly upon reaching the gastric lumen." },
  { sku: "JH Nutrition Citazinc", q: "What is the key synergistic formula in JH Nutrition Citazinc?", options: ["Vitamin C + Elemental Zinc", "Glucosamine + Chondroitin", "Calcium + Vitamin D3", "Omega-3 + CoQ10"], ans: 0, tip: "Vitamin C and Zinc work synergistically to support white blood cell activity and shorten colds." },
  { sku: "V-Infinity Vtrox", q: "V-Infinity Vtrox Throat Spray is most effective for which symptom?", options: ["Acute pharyngeal soreness and throat irritation", "Knee joint stiffness", "Skin eczema flare-up", "Gastric bloating"], ans: 0, tip: "Vtrox delivers targeted herbal antibacterial and anti-inflammatory relief to throat tissues." },
  { sku: "JH Nutrition Flvright", q: "What indication is JH Nutrition Flvright Vegecaps primarily formulated for?", options: ["Early cold, flu symptoms and runny nose", "Chronic joint cartilage repair", "Constipation relief", "Dry cracked heels"], ans: 0, tip: "Flvright features targeted bioflavonoids to clear upper respiratory congestion at early onset." },
  { sku: "V-Infinity Tyreps", q: "Which House Brand lozenge is ideal for soothing a dry, scratchy throat and hoarseness?", options: ["V-Infinity Tyreps Lozenges", "VK Dermsolve", "Arthri-Flex", "Livemore Glycoway"], ans: 0, tip: "Tyreps lozenges lubricate the throat lining and stimulate saliva production to relieve dry coughs." },
  { sku: "Biowell Terrafast 500mg", q: "Biowell Terrafast 500mg is clinically used for:", options: ["Gentle, rapid relief of fever, headache and mild-moderate pain", "Long-term cholesterol reduction", "Eye fatigue relief", "Eczema hydration"], ans: 0, tip: "Terrafast contains premium paracetamol for fast, stomach-friendly fever and pain management." },
  { sku: "JH Nutrition Citazinc", q: "When a patron buys cough syrup and paracetamol, what is the best House Brand add-on?", options: ["JH Nutrition Citazinc Effervescent/Capsules", "VK King Kong Balm", "Taiwan Herbal Ginger Patch", "Nutribridge Maxlim"], ans: 0, tip: "Citazinc enhances cellular defense to shorten viral respiratory episode duration." },
  { sku: "V-Infinity Vtrox", q: "How should a patient administer V-Infinity Vtrox Throat Spray?", options: ["Spray 2-3 pumps directly toward the back of the throat", "Dilute in 500ml boiling water", "Rub onto chest and back", "Swallow with meals"], ans: 0, tip: "Direct spray ensures maximal local mucosal concentration for immediate soothing." },
  { sku: "Arthri-Flex", q: "What is the primary therapeutic purpose of Arthri-Flex Glucosamine?", options: ["Repair joint cartilage & restore knee mobility", "Rapid fever reduction", "Sore throat relief", "Skin brightening"], ans: 0, tip: "Arthri-Flex provides essential glycosaminoglycans to stimulate synovial fluid and rebuild cartilage." },
  { sku: "Taiwan Herbal Ginger Patch", q: "Which House Brand product is ideal for stiff shoulders, backache, and lumbar pain?", options: ["Taiwan Herbal Ginger Patch", "Livemore Vitaglo", "JH Nutrition Citazinc", "Nutribridge Suppflora"], ans: 0, tip: "Taiwan Herbal Ginger Patches provide deep-penetrating warming therapy to relieve muscular tension." },
  { sku: "VK King Kong Balm", q: "VK King Kong Balm is formulated for:", options: ["Rapid relief of sprains, muscle aches, insect bites and headaches", "Chronic diabetes maintenance", "Gastric acid buffer", "Facial acne treatment"], ans: 0, tip: "VK King Kong Balm combines camphor, menthol and essential oils for fast counter-irritant relief." },
  { sku: "Arthri-Flex", q: "An elderly customer complains of clicking knees when climbing stairs. Recommend:", options: ["Arthri-Flex Glucosamine daily for at least 3 months", "Single dose paracetamol only", "Nutribridge Maxlim Coffee", "V-Infinity Vtrox Spray"], ans: 0, tip: "Cartilage regeneration requires consistent daily chondroprotective supplementation for 8-12 weeks." },
  { sku: "Taiwan Herbal Ginger Patch", q: "What is the recommended application duration for Taiwan Herbal Ginger Patches?", options: ["Apply to clean, dry skin for 6-8 hours", "Leave on continuously for 3 days", "Apply only in the shower", "Apply over open wounds"], ans: 0, tip: "6–8 hours provides optimal therapeutic heat without causing localized skin irritation." },
  { sku: "VK King Kong Balm", q: "When a customer buys oral pain tablets for muscle sprain, what is a great checkout pairing?", options: ["VK King Kong Balm or Taiwan Herbal Ginger Patches", "Biowell B'llox", "Livemore Lutein", "Nutribridge Suppflora"], ans: 0, tip: "Combining oral NSAIDs with topical heat patches/balms provides synergistic multi-target pain relief." },
  { sku: "VK Dermsolve Lotion", q: "VK Dermsolve Lotion is specially formulated for which skin type?", options: ["Dry, sensitive, eczema-prone, and itchy skin", "Severe fungal ringworm", "Open burn blisters", "Greasy acne-prone skin"], ans: 0, tip: "VK Dermsolve provides intensive ceramide and lipid replenishment without steroids." },
  { sku: "VK Dermsolve Lotion", q: "Why is VK Dermsolve Lotion safe for daily maintenance in children and sensitive adults?", options: ["100% steroid-free, fragrance-free, gentle hypoallergenic formula", "Contains strong corticosteroid hormones", "Contains alcohol to dry skin", "Contains bleaching agents"], ans: 0, tip: "Being steroid-free prevents skin thinning, tachyphylaxis, and rebound dermatitis." },
  { sku: "Dermacare Cream", q: "What is the ideal application timing for moisturizing dry or atopic skin?", options: ["Within 3 minutes after bathing while skin is slightly damp", "Only once a week before sleeping", "Only after scratching until bleeding", "Right before swimming"], ans: 0, tip: "Applying immediately post-bath locks in water molecules before trans-epidermal evaporation occurs." },
  { sku: "VK Dermsolve Lotion", q: "When a customer buys an antihistamine for an itchy rash, what is the best House Brand pairing?", options: ["VK Dermsolve Lotion to soothe and hydrate the skin barrier", "Nutribridge Maxlim Coffee", "Arthri-Flex Glucosamine", "Livemore Glycoway"], ans: 0, tip: "Oral antihistamines reduce the itch reflex while topical Dermsolve repairs the dry skin barrier." },
  { sku: "JH Nutrition Omega-3", q: "JH Nutrition Omega-3 Fish Oil 1200mg provides high EPA/DHA to support:", options: ["Healthy blood triglyceride levels, cardiovascular elasticity & brain health", "Acute nasal decongestion", "Gastric ulcer healing", "Muscle strain recovery"], ans: 0, tip: "EPA/DHA reduce triglyceride synthesis, promote endothelial function, and reduce inflammation." },
  { sku: "CoQ10 150mg", q: "Why is CoQ10 150mg highly recommended for patients taking statin cholesterol medications?", options: ["Statins deplete endogenous CoQ10, leading to muscle fatigue and cramps", "Statins increase stomach acid", "CoQ10 acts as a blood thinner", "Statins cause dry throat"], ans: 0, tip: "Statins block natural CoQ10 synthesis; replenishing CoQ10 relieves statin-induced muscle aches." },
  { sku: "Livemore Glycoway", q: "Livemore Glycoway is formulated to assist with which health objective?", options: ["Healthy blood sugar balance & cellular glucose uptake", "Rapid fever control", "Ear canal inflammation", "Immediate hair regrowth"], ans: 0, tip: "Glycoway combines chromium and botanicals to optimize insulin sensitivity." },
  { sku: "JH Nutrition Omega-3", q: "What is the key quality attribute of pharmaceutical-grade fish oil like JH Nutrition Omega-3?", options: ["Molecularly distilled for purity from heavy metals and mercury", "Flavored with artificial sugar", "Contains high cholesterol", "Made from warm-water freshwater fish"], ans: 0, tip: "Molecular distillation removes environmental toxins, PCBs, and heavy metals." },
  { sku: "CoQ10 150mg", q: "In addition to cardiovascular cellular energy, CoQ10 acts as a potent:", options: ["Lipid-soluble antioxidant protecting cell membranes", "Fast-acting antihistamine", "Strong broad-spectrum antibiotic", "Sedative sleep inducer"], ans: 0, tip: "CoQ10 neutralizes free radicals in mitochondrial membranes, supporting heart muscle vitality." },
  { sku: "Livemore Glycoway", q: "For a chronic diabetic patient picking up Metformin, what is an appropriate House Brand pair?", options: ["Livemore Glycoway and CoQ10 for vascular & metabolic support", "VK King Kong Balm", "V-Infinity Vtrox Spray", "Tyreps Lozenges"], ans: 0, tip: "Pairing anti-diabetic medications with metabolic nutritional support protects microvascular health." },
  { sku: "Livemore Lutein & Bilberry", q: "Livemore Lutein & Bilberry is primarily recommended for:", options: ["Filtering blue light, reducing digital eye strain & macular protection", "Relieving foot cramps", "Lowering fever", "Soothing throat hoarseness"], ans: 0, tip: "Lutein deposits in the retinal macula to filter harmful short-wavelength blue light." },
  { sku: "Ginkgo Biloba 120mg", q: "What is the primary pharmacological action of standardized Ginkgo Biloba 120mg?", options: ["Enhance cerebral & peripheral microcirculation, supporting memory and reducing tinnitus", "Suppress dry coughing", "Neutralize stomach acid", "Lubricate knee joints"], ans: 0, tip: "Ginkgo dilates microcapillaries and improves oxygenation to the brain and inner ear." },
  { sku: "Livemore Lutein & Bilberry", q: "A customer complains of tired, dry, blurry eyes after 8 hours on a computer. Recommend:", options: ["Livemore Lutein & Bilberry plus hydrating eye drops", "Taiwan Herbal Ginger Patch", "VK King Kong Balm", "Nutribridge Maxlim Coffee"], ans: 0, tip: "Bilberry anthocyanins promote rhodopsin regeneration and microcapillary blood flow in eyes." },
  { sku: "Ginkgo Biloba 120mg", q: "Patients experiencing cold hands/feet, numbness, and mild forgetfulness benefit most from:", options: ["Standardized Ginkgo Biloba 120mg", "Biowell B'llox", "VK Dermsolve Lotion", "Biowell Terrafast"], ans: 0, tip: "Ginkgo enhances peripheral microvascular perfusion to warm extremities and sharpen recall." },
  { sku: "Nutribridge Maxlim Coffee", q: "What is the primary function of Nutribridge Maxlim Coffee?", options: ["Promote thermogenic metabolism, energy expenditure & appetite management", "Deep tranquilizing sleep aid", "Wound sterilization", "Relieving sore throat"], ans: 0, tip: "Maxlim incorporates natural botanical extracts that support metabolic thermogenesis." },
  { sku: "Nutribridge Cordyceps", q: "Nutribridge Cordyceps is traditionally and clinically valued for:", options: ["Supporting lung capacity, respiratory stamina, kidney vitality & fatigue recovery", "Skin whitening", "Rapid acid indigestion relief", "Nasal decongestion"], ans: 0, tip: "Cordyceps increases cellular ATP production and improves oxygen utilization efficiency." },
  { sku: "Nutribridge Maxlim Coffee", q: "When is the best time for a customer to enjoy Nutribridge Maxlim Coffee?", options: ["In the morning or 30 minutes before exercise", "Right before going to bed at midnight", "During acute fever", "With heavy antibiotics"], ans: 0, tip: "Morning consumption energizes daily metabolism and supports sustained stamina." },
  { sku: "Nutribridge Cordyceps", q: "For a customer recovering from prolonged illness and feeling constantly drained, recommend:", options: ["Nutribridge Cordyceps Capsules", "VK King Kong Balm", "Dermacare Cream", "Tyreps Lozenges"], ans: 0, tip: "Cordyceps tonifies Qi, nourishes lung energetics, and speeds up physical recuperation." },
  { sku: "Livemore Vitaglo Chewables", q: "Livemore Vitaglo Chewable Tablets are formulated for:", options: ["Taking care of skin health, make it brighter and improve collagen production", "Relieving joint arthritis in elderly", "Neutralizing stomach acidity", "Treating fungal skin rash"], ans: 0, tip: "Vitaglo delivers essential micronutrients in delicious chewable format to help in skin health." },
  { sku: "Calcium + Vitamin D3", q: "Why is Vitamin D3 always formulated alongside Calcium in bone health supplements?", options: ["Vitamin D3 is essential for active intestinal absorption of Calcium into bones", "Vitamin D3 adds sweet taste", "Vitamin D3 acts as a painkiller", "Vitamin D3 lowers cholesterol"], ans: 0, tip: "Without Vitamin D3, less than 15% of ingested calcium can be absorbed from the gut." },
  { sku: "Livemore Vitaglo Chewables", q: "A mother requests a children's multivitamin because her child avoids vegetables. Recommend:", options: ["Livemore Vitaglo Chewables", "Arthri-Flex", "Nutribridge Maxlim", "VK King Kong Balm"], ans: 0, tip: "Vitaglo covers dietary micronutrient gaps in pediatric development with safe, balanced daily doses." },
  { sku: "Calcium + Vitamin D3", q: "Which population group has the greatest clinical need for daily Calcium + Vitamin D3?", options: ["Post-menopausal women and elderly at risk of osteopenia/osteoporosis", "Athletes with muscle sprain", "Patients with acute cold/cough", "Individuals with stomach ulcer"], ans: 0, tip: "Estrogen decline post-menopause accelerates bone mineral loss; Calcium + D3 preserves bone density." },
  { sku: "Taiwan Herbal Ginger Patch", q: "A driver complains of lower back ache after long hours of driving. Best practical advice:", options: ["Taiwan Herbal Ginger Patch on lumbar area + oral muscle relaxant if needed", "Nutribridge Maxlim Coffee", "Eye drops only", "Vitamin C only"], ans: 0, tip: "Ginger patches offer continuous warming pain relief while seated without causing drowsiness." },
  { sku: "V-Infinity Vtrox", q: "A teacher loses her voice and has throat dryness before exams. What should she carry?", options: ["V-Infinity Vtrox Throat Spray and Tyreps Lozenges", "VK Dermsolve Lotion", "Biowell B'llox", "Arthri-Flex Glucosamine"], ans: 0, tip: "Portable throat sprays provide instant voice lubrication and mucosal anti-inflammatory relief." },
  { sku: "JH Nutrition Citazinc", q: "What is the recommended daily timing for taking JH Nutrition Citazinc?", options: ["After breakfast or lunch with plenty of water", "On an empty stomach before sleeping", "Only when fever exceeds 39°C", "Dissolved in hot tea"], ans: 0, tip: "Taking zinc and vitamin C post-meal prevents gastric irritation and optimizes absorption." },
  { sku: "Nutribridge Suppflora", q: "A patient asks: 'Why take probiotics when buying gastric medicine?' Best clinical answer:", options: ["Probiotics restore healthy digestion and reduce bloating caused by altered stomach acid balance", "Probiotics are only for taste", "Gastric medicine causes sore throat", "Probiotics lower blood pressure"], ans: 0, tip: "Suppflora balances the lower gastrointestinal tract when antacids or PPIs alter natural gastric pH." },
  { sku: "VK Dermsolve Lotion", q: "A mother asks for steroid cream for a toddler's mild red dry cheeks. Best safer alternative:", options: ["VK Dermsolve Lotion to repair the skin barrier without steroid side effects", "Strong hydrocortisone on face", "VK King Kong Balm", "Taiwan Herbal Ginger Patch"], ans: 0, tip: "Pediatric facial skin is thin; steroid-free barrier moisturizers like Dermsolve are the safest choice." },
  { sku: "Arthri-Flex", q: "Why choose Arthri-Flex over standard painkillers alone for chronic osteoarthritis?", options: ["Arthri-Flex addresses root cartilage breakdown, whereas painkillers only mask symptoms", "Arthri-Flex works in 5 minutes", "Painkillers are illegal", "Arthri-Flex is an antibiotic"], ans: 0, tip: "Glucosamine promotes structural cartilage remodeling rather than merely blocking pain signals." },
  { sku: "JH Nutrition Omega-3", q: "When a customer asks how to store fish oil capsules in humid Malaysian weather:", options: ["Store in a cool, dry place below 30°C away from direct sunlight, or in the refrigerator", "Leave on the car dashboard under direct sun", "Freeze in ice cubes", "Leave bottle cap open"], ans: 0, tip: "Heat and UV light cause oxidation and rancidity in polyunsaturated fatty acids." },
  { sku: "Biowell Terrafast 500mg", q: "What is the maximum daily safe dose of Paracetamol (Biowell Terrafast 500mg) for an adult?", options: ["4,000mg (8 tablets of 500mg) in 24 hours", "10,000mg in 24 hours", "2 tablets once a week", "1 tablet every 30 minutes indefinitely"], ans: 0, tip: "Exceeding 4,000mg paracetamol within 24 hours poses severe risks of hepatotoxicity." },
  { sku: "Biowell B'llox", q: "How should a patient take Biowell B'llox for optimal heartburn relief?", options: ["Chew or take 1-2 tablets after meals or at the onset of heartburn symptoms", "Dissolve in boiling tea", "Take only once a month", "Rub onto the abdomen"], ans: 0, tip: "Taking B'llox post-meal or upon symptom onset allows direct acid neutralization when gastric acid is highest." }
];

function sanitizeQuizItem(item) {
  if (!item) return item;
  if (typeof item.q === 'string' && item.options && item.options === item.q) {
    const parts = item.q.split(',');
    if (parts.length >= 8) {
      item.sku = parts[2] ? parts[2].trim() : "House Brand";
      item.q = parts[3] ? parts[3].trim() : item.q;
      item.options = [
        parts[4] ? parts[4].trim() : "",
        parts[5] ? parts[5].trim() : "",
        parts[6] ? parts[6].trim() : "",
        parts[7] ? parts[7].trim() : ""
      ];
      item.tip = parts.slice(8).join(',').trim();
    }
  }
  return item;
}

let pendingQuizCallback = null;

function openQuizModal(reasonText, callbackOnSuccess) {
  pendingQuizCallback = callbackOnSuccess;
  let qObj = HB_QUIZ_BANK[Math.floor(Math.random() * HB_QUIZ_BANK.length)];
  qObj = sanitizeQuizItem(qObj);

  const correctText = qObj.options[qObj.ans || 0];
  const shuffled = [...qObj.options].sort(() => Math.random() - 0.5);
  const correctIdx = shuffled.indexOf(correctText);

  setSafeText('quizSkuBadge', (qObj.sku || "House Brand") + " Challenge");
  setSafeText('quizQuestionText', qObj.q);

  const optsCont = document.getElementById('quizOptionsContainer');
  if (optsCont) {
    optsCont.innerHTML = "";
    shuffled.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = "quiz-opt-btn";
      btn.innerText = optText;
      btn.onclick = () => handleQuizAnswer(idx, correctIdx, qObj.tip);
      optsCont.appendChild(btn);
    });
  }

  const feedback = document.getElementById('quizFeedbackBox');
  if (feedback) feedback.style.display = "none";
  const actionBtn = document.getElementById('quizActionBtn');
  if (actionBtn) actionBtn.style.display = "none";

  const modal = document.getElementById('quizModal');
  if (modal) modal.style.display = "flex";
}

function handleQuizAnswer(chosenIdx, correctIdx, tip) {
  const feedback = document.getElementById('quizFeedbackBox');
  const actionBtn = document.getElementById('quizActionBtn');
  const optsCont = document.getElementById('quizOptionsContainer');
  if (optsCont) {
    const btns = optsCont.querySelectorAll('button');
    btns.forEach((b, i) => {
      b.disabled = true;
      if (i === correctIdx) b.style.borderColor = "#2e7d32";
      if (i === chosenIdx && i !== correctIdx) b.style.borderColor = "#c62828";
    });
  }

  if (feedback) {
    feedback.style.display = "block";
    if (chosenIdx === correctIdx) {
      feedback.className = "quiz-feedback feedback-correct";
      feedback.innerHTML = `✅ <b>CORRECT!</b><br>${tip}`;
    } else {
      feedback.className = "quiz-feedback feedback-wrong";
      feedback.innerHTML = `❌ <b>CLINICAL NOTE:</b><br>${tip}`;
    }
  }

  if (actionBtn) {
    actionBtn.style.display = "block";
    if (chosenIdx === correctIdx) {
      actionBtn.innerText = "Claim Reward ⭐";
      actionBtn.onclick = () => {
        closeQuizModal();
        if (pendingQuizCallback) pendingQuizCallback(true);
      };
    } else {
      actionBtn.innerText = "Try Again 🔄";
      actionBtn.onclick = closeQuizModal;
    }
  }
}

function closeQuizModal() {
  const modal = document.getElementById('quizModal');
  if (modal) modal.style.display = "none";
}
