function day21(input) {
  var allergenMap = {}; // key: allergen, value: array of possible ingredients
  var ingredientsSeen = {}; // key: ingredient, value: count of times seen
  
  for (var i = 0; i < input.length; i++) {
    var ingredientList = input[i].split(" (contains ")[0].split(" ");
    var allergenList = input[i].split(" (contains ")[1].split(")")[0].split(", ");
    
    for (var j = 0; j < ingredientList.length; j++) {
      var currIngredient = ingredientList[j];
      if (!ingredientsSeen[currIngredient]) {
        ingredientsSeen[currIngredient] = 0;
      }
      ingredientsSeen[currIngredient]++;
    }
    for (var j = 0; j < allergenList.length; j++) {
      var currAllergen = allergenList[j];
      if (!allergenMap[currAllergen]) {
        // First seen:
        allergenMap[currAllergen] = deepCopy(ingredientList);
      } else {
        // Seen before; perform intersection:
        allergenMap[currAllergen] = arrayIntersection(allergenMap[currAllergen], ingredientList);
      }
    }
  }
  
  /** Part 1 */
  // Count ones that are no longer in any lists:
  var sum = 0;
  for (var ingredientKey in ingredientsSeen) {
    var possibleAllergen = false;
    for (var allergenKey in allergenMap) {
      if (arrayContains(allergenMap[allergenKey], ingredientKey)) {
        possibleAllergen = true;
        break;
      }
    }
    if (!possibleAllergen) {
      sum += ingredientsSeen[ingredientKey];
    }
  }
  console.log("Sum for part 1: " + sum);
  
  /** Part 2 */
  // Go through each allergen list and find allergens with one possibility, then remove the possibility from other things:
  var allergensStillExist = true;
  var canonicalAllergens = {};
  while (allergensStillExist) {
    allergensStillExist = false;
    for (var allergenKey in allergenMap) {
      if (allergenMap[allergenKey].length === 1) {
        var ingredient = allergenMap[allergenKey][0];
        // Set canonical value:
        canonicalAllergens[allergenKey] = ingredient;
        // Erase ingredient from all allergens in map:
        for (var allergenKey2 in allergenMap) {
          removeItemFromArray(allergenMap[allergenKey2], ingredient);
        }
        allergensStillExist = true;
        break;
      }
    }
  }
  // Sort alphabetically by allergen and comma-separate result:
  var allergenArray = [];
  for (var allergenKey in canonicalAllergens) {
    allergenArray.push(allergenKey);
  }
  allergenArray.sort();
  var ingredientArray = [];
  for (var i = 0; i < allergenArray.length; i++) {
    ingredientArray.push(canonicalAllergens[allergenArray[i]]);
  }
  console.log(ingredientArray.join(","));
}

/** ========== Helper functions ========== */
function arrayContains(inputArr, val) { return inputArr.indexOf(val) !== -1; }
function arrayIntersection(array1, array2) { return array1.filter(value => array2.includes(value)); }
function bin2dec(bin) { return parseInt(bin, 2); }
function dec2bin(dec) { return (dec >>> 0).toString(2); }
function deepCopy(input) { return JSON.parse(JSON.stringify(input)); }
function removeItemFromArray(inputArr, val) { if (arrayContains(inputArr, val)) { inputArr.splice(inputArr.indexOf(val), 1); } }
function replaceCharAt(inputStr, index, character) { return inputStr.substr(0, index) + character + inputStr.substr(index + 1); }
function stringContains(inputStr, subStr) { return inputStr.indexOf(subStr) !== -1; }
/** ====================================== */

day21(
  [
    "mxmxvkd kfcds sqjhc nhms (contains dairy, fish)",
    "trh fvjkl sbzzf mxmxvkd (contains dairy)",
    "sqjhc fvjkl (contains soy)",
    "sqjhc mxmxvkd sbzzf (contains fish)"
  ]
);

day21(
  [
    "lstszk nqmpbj tbns dtmrg qfpshxg rzqxjt hfjcm ghspr bhl nvgltvp nnghzx ljkgrv dbgtk xlpnhzk qxcbdq jvgnc mxxnn ftxvj qhjqq dbsm fqhhh cpmqmd zqp gssmcm kbmlt bmqft rgg bckqmz qjkvzrj smthrb xfkk mrccxm crpp mtdqzs zdsfp xqxjmh lpzgzmk tqlmf dxrj vrgtc pxxh pfpd bnqvfg ppj nblt strzx plrlg dshk zmjgh lcr lfxnqb stj tpxr gjmmvlx lkbgv nkztt rxrcp gvzkz vlrrm dhlsfm zxzsp rhvjh mkvzps sjn rqkzqhm ksnnt (contains sesame)",
    "ffv trs xvt sjn svnkt ppj cpnz ttqcjc ftxvj mkvzps lzs kzzcg bdds mrnzdb tqlmf vrgtc vjngxs xqxjmh qmkr fzcrb gxjv jvgnc plrlg mrccxm jghzkx xlpnhzk qfllqzq kbmlt gtbzks mxxnn zzrc nblt zcl nsgvx rcgc rqkzqhm zdgxsxg xtqs zchs shzv lpbsvq zmjgh stj pfpd njcpxn mqnlsk vlrrm ldpl xtflt hrmbv mbvdr lnxcm pcfgsc gssmcm ktzvqsv rhvjh zgrvqc lpzgzmk qfxgrl lfxnqb bvnxkx pprcp dtsqng rxrcp xdjtdmxs pccg tdrh crpp jrczjdvh tbns gvzkz zjdkf (contains eggs)",
    "qmkr mtdqzs gvzkz jvgnc zjdkf xtflt hkx vdghdc clt nfgv bnqvfg jnqvv pprcp fltk mnrnts jjtc tqlmf bprncs jlh vlrrm dbsm fzcrb mgdkfn snjq vjngxs lnxcm hrmg qfpshxg hghkj xlpnhzk zdsfp rcgc shzv plrlg zmjgh zchs bvnxkx tplc fqhhh gxnr xhcbk ttfctr mxxnn zdgxsxg nglg pmg pvlznp pxxh kq ljkgrv rxrcp rkpnsv qlbvk rsc ngrkp crpp bmqft xgtl fbplkn tbns qhjqq rhdh rrkjkz tnjtdf hmlx zzrc cpmqmd trs zlkcs sjn kbmlt mrccxm lpbsvq hpk pkrfq lpkbnb tpxr lzs mljm vmcczg stj jjlbpdl pnjj vrjs lpzgzmk hmjmsl ldpl (contains shellfish, nuts)",
    "vmcczg fqhhh mxxnn fzcrb rzqxjt rxrsz rgg lktpx rcgc qfllqzq ppj gtbzks rhvjh xpjcnq tplc mqnlsk pcfgsc hghkj vbjknl hmjmsl ghspr dshk njcpxn fltk mgdkfn ktzvqsv shzv stj tqlmf smthrb nglg crpp fbplkn pkrfq pmg nblt lzs bbpcgfr sqkbn bprncs sjn mkvzps rkpnsv mrccxm pprcp nm xtflt plrlg nvgltvp fslg ftxvj htrp vdghdc xfkk gxjv vkgh msxdtzt zzrc kbmlt bckqmz gxnr pnjj hshx pxxh qfpshxg btz tnjtdf pfpd zlkcs rsc zdsfp zdgxsxg dtmrg hpk ztxrfc lpzgzmk lstszk vpsq qlbvk hfjcm qfxgrl dbgtk kzzcg trs mbvdr (contains peanuts, soy, sesame)",
    "ttfctr mxxnn clt xvgj qfxgrl zxrbz qxcbdq ttqcjc ppj rhvjh dhlsfm nglg hpk msld nblt ksnnt vlmppdhn xhblgds tdrh vrgtc nqmpbj njcpxn jvgnc zjdkf xpjcnq sfflvrf jjlbpdl vmcczg snjq rkpnsv hshx mrccxm nm bdds dtmrg xqxjmh jghzkx dbsm mtdqzs rcgc plrlg gxnr rkkq hmjmsl hkx mnrnts fltk xhcbk hrmg btz fzcrb bckqmz qhjqq lktpx crpp jnqvv tnjtdf strzx ngrkp kbmlt lpzgzmk (contains peanuts, shellfish, fish)",
    "lcr sjn zmjgh smthrb lnxcm fslg jvgnc clt klm lpzgzmk nm jnqvv ghspr vqnzjk gtbzks dglrks hrmg vrgtc xgtl mrccxm stj rsc pmg rcgc hghkj zxzsp xqxjmh bmqft njcpxn qmkr shzv qfllqzq lzs cpmqmd rkkq gssmcm gxnr qjkvzrj pcfgsc hrmbv hshx zchs pxxh kzzcg dhlsfm bvnxkx vlrrm vfmggjg mzjgp mljm ngrkp bfnkf pvlznp fzcrb vdklml ffv ztxrfc mtdqzs gvzkz plrlg pfpd hbqvgsc rgg qhjqq htrp xtqs mxxnn nfgv dtmrg xvgj xtflt lkbgv xhblgds qfpshxg kbmlt sqkbn tqlmf ftxvj zdsfp tdrh cpnz nhvl rtl (contains fish)",
    "hfjcm hkx pnjj pxxh lkbgv mxxnn fgkgs fltk bprncs stj dshk snjq ttqcjc nblt kbmlt bmqft rcgc bdds lstszk nsgvx xtflt drnhfq qhjqq rrkjkz zdsfp jjtc fzcrb jvgnc njcpxn zqp mljm zzrc gxnr jlh zlvdgnq rhdh plrlg ksnnt mrccxm lpzgzmk qfllqzq lzs (contains wheat, sesame)",
    "xhcbk gxnr dbsm bfnkf nfgv dtmrg vdklml stj xqxjmh nhvl bnqvfg lpzgzmk gxjv fbplkn jvgnc mkvzps vlmppdhn rhdh zjdkf plrlg vfmggjg rhvjh kbmlt smthrb rkkq fltk rrkjkz pnjj nvdnp qmkr kq mgdkfn hghkj xdjtdmxs vdghdc bvnxkx btz jrczjdvh rgg dxrj ztxrfc zqp ljkgrv mljm xtflt nkztt fslg nnghzx njcpxn lpkbnb fzcrb zzgdb bckqmz sjn vmcczg mrccxm (contains soy)",
    "lpzgzmk ljdjl btz ftxvj kq pnjj pprcp blkl ztxrfc shzv xgtl zzgdb kbmlt hshx bbpcgfr plrlg rhdh bprncs snjq dxrj mkvzps sqkbn bckqmz xtqs zmjgh zlvdgnq dbsm hbqvgsc hmlx zfb cpnz dtsqng bnqvfg vrjs vlrrm vdklml lcr dglrks njcpxn rhvjh klm rcgc vmcczg pccg zchs zgrvqc gxnr ghspr mrccxm dtmrg lfxnqb dhlsfm jvgnc rsc jnqvv nsgvx jghzkx zxrbz ldpl pmg vdghdc nblt fgkgs htrp nm pcfgsc qmkr vfmggjg zdgxsxg tqlmf zzrc vkgh fcdxphc crpp nhvl qfpshxg rxrsz stj xtflt (contains eggs, nuts, soy)",
    "xqxjmh lpkbnb lnxcm qxcbdq vdklml ldpl zdsfp ttqcjc fcdxphc dbgtk msxdtzt gtbzks jnqvv hrmbv rkpnsv bprncs rhdh ppj mrccxm nkztt nblt rkkq ttfctr mljm gxnr ljdjl rxrsz pxxh hrmg mnrnts xpjcnq dtsqng rxrcp sfflvrf zgrvqc kbmlt zchs pprcp xhcbk bnqvfg ghspr zmmp sqkbn fqhhh nm zdgxsxg lpbsvq cpnz fbplkn tplc nnghzx kkfnhr vjngxs dbsm mrnzdb mgdkfn stj pccg blkl xvt mtdqzs trs rhvjh lfxnqb strzx pfpd zjdkf lpzgzmk jvgnc hfjcm mqnlsk dglrks jlh xhblgds vfmggjg nvgltvp xvgj crpp bbpcgfr sjn bvnxkx nfgv hsvx zfb pcfgsc bckqmz qlbvk lstszk zzrc mzjgp shzv mkvzps bdds (contains nuts, shellfish, soy)",
    "gvzkz mljm dxrj nkztt mbvdr rzqxjt kkfnhr lpzgzmk xhcbk pvlznp jvgnc klm rcgc xqxjmh rsc zcl bhl lkbgv ztxrfc ttfctr mrccxm tplc mxxnn rhdh pkrfq gxnr plrlg hrmg nvdnp bfnkf vpsq rqkzqhm vfmggjg stj pnjj ppj vdklml rxrsz ldpl fbplkn mgdkfn hghkj tdrh xtqs pfpd strzx ghspr lktpx fgkgs fltk rrkjkz (contains wheat, sesame)",
    "hrmg fltk sqkbn bfnkf zfb dglrks tnjtdf tdrh jjtc jvgnc nnghzx sfflvrf kq blkl qcpc mrccxm rzqxjt nhvl bmqft rhdh rcgc mtdqzs fcdxphc vlrrm bnqvfg xgtl vqnzjk lktpx vdklml ttfctr pfpd msld dbgtk hlhpq zzrc rkkq kzzcg cpnz plrlg dbsm vlmppdhn hfjcm ksnnt zxzsp gxnr kbmlt vdghdc lpkbnb jghzkx tplc pxxh lnxcm mbvdr vrjs mxxnn zcl pmg pcfgsc qfllqzq zlvdgnq nglg vjngxs nsgvx ppj bbpcgfr htrp nm hbqvgsc xpjcnq xqxjmh ghspr ztxrfc xvgj drnhfq xdjtdmxs tbns zxrbz ffv hsvx lpzgzmk lkbgv jrczjdvh lstszk bckqmz pccg strzx gxjv (contains peanuts, shellfish)",
    "zlkcs hfjcm zmmp lfxnqb zqp nsgvx lpzgzmk stj qfpshxg dtmrg xvgj hghkj gssmcm rgg bdds lkbgv bhl pnjj vrgtc xhblgds xvt bbpcgfr fgkgs mrccxm strzx kbmlt rkpnsv rkkq jvgnc qfxgrl ktzvqsv tdrh pvlznp jrczjdvh bprncs mqnlsk ffv clt lcr plrlg ljdjl mbvdr hkx lstszk gxnr xlpnhzk tpxr mnrnts ljkgrv hrmg ttfctr (contains sesame)",
    "pcfgsc cpmqmd qfpshxg xdjtdmxs xvt pxxh hghkj vpsq snjq mtdqzs lpzgzmk sjn rsc dbgtk dhlsfm msld ksnnt vkgh lfxnqb zlvdgnq xhcbk tqlmf qlbvk jghzkx nvdnp tnjtdf hkx pnjj rhdh nblt qxcbdq rcgc vmcczg gtbzks nsgvx pfpd plrlg vbjknl xhblgds nvgltvp vdghdc nfgv hrmbv hbqvgsc hlhpq xtqs stj blkl jvgnc nm lktpx fbplkn tdrh zxrbz pmg sqkbn rkpnsv klm gxnr xtflt kkfnhr hshx dbsm nglg lkbgv jrczjdvh pvlznp kbmlt xgtl kzzcg bbpcgfr mrccxm rkkq lzs fcdxphc msxdtzt jjtc crpp hrmg (contains wheat, shellfish, nuts)",
    "bckqmz bnqvfg gssmcm zzgdb ljdjl lfxnqb zjdkf zchs ppj ftxvj dxrj nm stj hpk mxxnn fslg shzv kbmlt rgg plrlg ngrkp nsgvx bprncs njcpxn mrnzdb mnrnts gxnr gvzkz lpzgzmk zlkcs tpxr dhlsfm vrgtc pxxh mrccxm zlvdgnq qxcbdq pnjj mmbdpl zfb bbpcgfr zmmp mzjgp xfkk zxzsp mgdkfn gjmmvlx svnkt nnghzx qhjqq (contains wheat, fish)",
    "jjlbpdl qhjqq bhl ftxvj stj dtsqng hpk hsvx bdds kbmlt mrccxm ppj zxrbz dshk hbqvgsc lkbgv zfb blkl hrmbv fbplkn gxnr mzjgp zdgxsxg dbsm vqnzjk jrczjdvh mmbdpl gjmmvlx vfmggjg snjq ttfctr xvt nkztt sfflvrf bvnxkx bnqvfg lpzgzmk njcpxn qfpshxg cpnz cpmqmd jvgnc sjn qcpc (contains eggs)",
    "gxnr lzs nkztt zmjgh hmlx jvgnc xtflt zxrbz kzzcg rqkzqhm pxxh fltk xvt pfpd nsgvx vdghdc rkpnsv msxdtzt ktzvqsv stj plrlg zjdkf rxrsz zchs zgrvqc vpsq btz hlhpq xhcbk shzv kbmlt vqnzjk vlmppdhn hpk bnqvfg dbgtk qmkr vfmggjg bbpcgfr lstszk zmmp dxrj lpzgzmk xpjcnq vbjknl ppj dglrks xhblgds bmqft zcl hrmbv hfjcm fqhhh (contains eggs, sesame)",
    "ffv jjlbpdl shzv zjdkf dshk jvgnc xtqs ttfctr hghkj lkbgv tqlmf vdghdc hrmg zxzsp zgrvqc mnrnts bprncs kq gtbzks zdgxsxg nvdnp fqhhh lpzgzmk ftxvj gxjv zlvdgnq pmg lktpx fgkgs kbmlt drnhfq lpkbnb rgg gxnr fzcrb stj msxdtzt zmmp nblt pnjj kzzcg nglg lcr nvgltvp hbqvgsc klm vfmggjg qhjqq qfllqzq zxrbz sqkbn qfxgrl htrp plrlg cpnz jrczjdvh qjkvzrj lpbsvq xdjtdmxs vqnzjk ppj tplc zcl lstszk sjn (contains nuts, sesame)",
    "snjq jlh lzs strzx pmg ldpl fbplkn ljkgrv gjmmvlx tpxr nvdnp mkvzps tdrh pkrfq zxzsp ppj mqnlsk rcgc rqkzqhm xtflt mmbdpl drnhfq cpmqmd bckqmz lpzgzmk ljdjl rxrsz pprcp tplc zlvdgnq xtqs lpkbnb zzgdb gssmcm gvzkz qcpc kbmlt dbgtk msld zqp dbsm gxnr vrjs qjkvzrj bbpcgfr rzqxjt lstszk zchs plrlg ksnnt mljm nnghzx zjdkf zdgxsxg hbqvgsc pcfgsc fgkgs rtl pvlznp vpsq vmcczg dtmrg rxrcp ttqcjc mzjgp vlmppdhn lpbsvq hmjmsl hkx nfgv bprncs zdsfp fslg mrccxm qhjqq qxcbdq tbns fcdxphc mbvdr nqmpbj pnjj bhl jvgnc kq zxrbz dhlsfm (contains shellfish)",
    "hlhpq zxrbz lpzgzmk zzrc hmjmsl lcr dglrks jghzkx rcgc zfb mkvzps xvt njcpxn vrgtc zqp xdjtdmxs plrlg ksnnt kbmlt hpk nkztt vrjs mmbdpl lzs vqnzjk bnqvfg vfmggjg nsgvx mrccxm mxxnn ppj htrp kzzcg rkkq hsvx vjngxs fbplkn pfpd lfxnqb vkgh xhcbk zmmp nnghzx zxzsp bckqmz lstszk stj xvgj jlh dshk gxnr kq (contains eggs)",
    "zdsfp pnjj mkvzps jvgnc zqp pvlznp xtflt crpp lnxcm fcdxphc bdds pfpd bfnkf bckqmz kbmlt qjkvzrj fqhhh lpbsvq smthrb zchs mtdqzs rxrcp tplc stj jlh bvnxkx rcgc ppj vdghdc htrp rsc qmkr lpzgzmk mrccxm gxnr nkztt ghspr hshx hrmg pcfgsc rzqxjt nqmpbj mzjgp vqnzjk ttfctr tbns jjtc gxjv nglg dbgtk ldpl lpkbnb xtqs qfllqzq vjngxs kkfnhr zzgdb zcl pxxh jghzkx fzcrb gjmmvlx nnghzx snjq xgtl lktpx qhjqq lkbgv xvgj pkrfq dshk fltk hkx ljkgrv (contains shellfish)",
    "bvnxkx ngrkp hghkj ktzvqsv strzx crpp vfmggjg lpbsvq lstszk sqkbn mnrnts dxrj hmlx vjngxs xvt rsc xqxjmh pxxh xhcbk zqp pnjj fzcrb hbqvgsc gxnr jrczjdvh nfgv pccg jghzkx ppj tqlmf gjmmvlx rxrsz rgg gtbzks mrccxm mxxnn hmjmsl rkpnsv nvgltvp lkbgv mrnzdb gxjv ldpl vrjs qfpshxg tplc xfkk ghspr zchs shzv xtqs msld dshk rzqxjt zfb xpjcnq htrp zlkcs ljkgrv xgtl pcfgsc vdklml jjtc mmbdpl zxzsp plrlg qmkr lpzgzmk nnghzx sjn kzzcg zmmp tdrh kbmlt jvgnc ztxrfc mtdqzs (contains fish, peanuts, shellfish)",
    "rzqxjt hfjcm xqxjmh hsvx lpzgzmk vlmppdhn fltk plrlg blkl gjmmvlx qhjqq sfflvrf rkkq zmmp sjn zcl dhlsfm ljkgrv fqhhh hbqvgsc hghkj pprcp jlh gxjv kkfnhr snjq kzzcg hrmg bnqvfg rqkzqhm jrczjdvh hrmbv tnjtdf bmqft rxrsz pkrfq jvgnc stj gssmcm dbgtk rsc zfb tplc jnqvv nhvl lpbsvq msxdtzt rrkjkz ttqcjc pccg ljdjl zzgdb ppj vpsq zzrc nfgv lnxcm rtl kbmlt fslg fzcrb jjtc mxxnn zxrbz bhl msld nnghzx mrccxm lstszk (contains fish, nuts, peanuts)",
    "stj xlpnhzk cpmqmd lpzgzmk mrnzdb jrczjdvh dhlsfm nblt vpsq jjtc lnxcm nm pcfgsc jlh hmlx bhl bckqmz mmbdpl tpxr bdds pccg lpkbnb nsgvx xhcbk nkztt lzs zmjgh rkkq qjkvzrj rcgc kzzcg gxnr tplc xtflt tqlmf vfmggjg ppj tnjtdf qxcbdq ztxrfc mzjgp zzrc nfgv ljkgrv vmcczg tbns hrmbv zchs qfllqzq zjdkf fbplkn mrccxm drnhfq hghkj kkfnhr vrjs dtmrg vkgh dtsqng kbmlt zmmp plrlg nvdnp gxjv trs mqnlsk cpnz shzv ffv xtqs xhblgds vdghdc ttfctr mbvdr (contains eggs)",
    "ttfctr htrp strzx rxrcp stj qlbvk hpk njcpxn zjdkf vdghdc jghzkx gtbzks bckqmz lpkbnb lkbgv rqkzqhm vbjknl mmbdpl jlh hghkj ljkgrv dshk lpzgzmk fzcrb pkrfq ghspr kbmlt dbsm ksnnt lcr xhblgds nsgvx dbgtk rhvjh snjq rxrsz cpnz lzs bvnxkx mrccxm ppj shzv tbns jvgnc gxnr crpp pnjj pcfgsc rzqxjt lpbsvq bbpcgfr qfllqzq hmjmsl zchs mgdkfn zxzsp pprcp nkztt pccg zlvdgnq pvlznp nnghzx rcgc hsvx nglg fcdxphc zdsfp pmg mljm qmkr zmmp vlrrm xqxjmh zcl hrmg xlpnhzk hmlx zqp xvgj xdjtdmxs qhjqq zzgdb (contains soy)",
    "zcl nsgvx hshx mrnzdb zzrc rgg vdghdc jghzkx lnxcm qhjqq vdklml svnkt zgrvqc msxdtzt tbns gjmmvlx qcpc plrlg lpzgzmk vlmppdhn pxxh vrjs ghspr dxrj hsvx jvgnc rtl zfb pvlznp xdjtdmxs bnqvfg mkvzps htrp ngrkp ljdjl stj nvgltvp zlvdgnq jlh hfjcm qxcbdq ldpl nnghzx ttqcjc ppj sjn zmjgh vmcczg fgkgs hrmbv xtqs nglg vjngxs vqnzjk tdrh dbsm xlpnhzk pkrfq fltk bmqft zqp ktzvqsv vlrrm bbpcgfr hghkj klm lpbsvq cpnz gvzkz gxnr fqhhh dbgtk clt vpsq crpp mrccxm qfpshxg (contains nuts, peanuts)",
    "xhcbk hrmbv qjkvzrj tplc jlh gxnr nkztt xfkk vrjs kbmlt htrp hrmg blkl msld xtqs lcr jvgnc vdghdc vqnzjk fcdxphc bbpcgfr mrccxm plrlg rqkzqhm dtsqng tbns hkx nqmpbj zzgdb nnghzx clt xtflt xqxjmh bckqmz vlrrm lpzgzmk tqlmf pnjj lzs cpnz hshx dtmrg bprncs zlvdgnq mnrnts zmmp qlbvk xpjcnq rxrcp ppj pfpd pkrfq dxrj qfpshxg ldpl lktpx qcpc qhjqq nfgv strzx jrczjdvh svnkt xvgj fgkgs (contains fish, shellfish, nuts)",
    "tqlmf bmqft strzx tpxr dtmrg drnhfq pkrfq vlrrm rxrsz kbmlt gxnr lpzgzmk vbjknl hkx njcpxn rxrcp jvgnc dshk zfb stj bnqvfg vrjs xtqs pccg tplc zchs mrnzdb vfmggjg jrczjdvh lcr vjngxs bdds lnxcm dbgtk crpp ppj hsvx ttqcjc mnrnts zcl rhdh mbvdr ztxrfc svnkt hbqvgsc gxjv pxxh bckqmz lfxnqb plrlg pvlznp lktpx xlpnhzk (contains soy, wheat)",
    "mnrnts zmmp zdgxsxg gxjv lpkbnb tqlmf ngrkp kkfnhr rzqxjt vfmggjg mbvdr cpnz mrccxm msxdtzt qfxgrl pxxh rxrcp fcdxphc rkpnsv lfxnqb xdjtdmxs zlkcs stj jrczjdvh xvt qxcbdq tbns ksnnt fgkgs jnqvv zjdkf gjmmvlx bfnkf lnxcm crpp mxxnn kbmlt rhdh xtflt sjn ftxvj gxnr rxrsz gvzkz ztxrfc lpzgzmk zzgdb mrnzdb fzcrb zmjgh jvgnc sqkbn cpmqmd rgg nqmpbj mljm njcpxn ppj mtdqzs zgrvqc mqnlsk nhvl bbpcgfr zchs rhvjh nm svnkt ktzvqsv nvgltvp tnjtdf pfpd (contains peanuts, soy)",
    "pfpd clt vdghdc plrlg qlbvk tdrh cpnz xfkk gssmcm xhcbk zlvdgnq xtflt lnxcm lpzgzmk rrkjkz lzs hghkj vrgtc xqxjmh njcpxn zgrvqc xpjcnq bhl nkztt bprncs svnkt zjdkf vqnzjk jnqvv fzcrb rtl vdklml zmmp qfxgrl vlmppdhn bvnxkx tnjtdf vlrrm zzrc xgtl lktpx dxrj mrccxm dtmrg zzgdb kbmlt fqhhh jlh ljkgrv stj nsgvx sjn hmlx nvgltvp mqnlsk gxnr nvdnp ftxvj xtqs smthrb nqmpbj bmqft rcgc jvgnc bckqmz (contains eggs)",
    "hkx rcgc hsvx vkgh tplc zzgdb gxnr ppj jlh zcl pxxh mkvzps dglrks qfxgrl pcfgsc nkztt xtqs blkl ksnnt bvnxkx jghzkx ljkgrv mmbdpl vdklml ldpl bbpcgfr pvlznp fltk lpzgzmk kkfnhr stj clt zdgxsxg trs zxrbz xqxjmh pccg mzjgp vrjs jjlbpdl vrgtc vlmppdhn kbmlt hshx sjn nhvl rhdh bprncs mljm mrnzdb njcpxn fslg hpk mrccxm gtbzks lfxnqb zdsfp lnxcm jvgnc sfflvrf nglg ktzvqsv nblt rzqxjt rsc xhcbk pfpd lkbgv zzrc snjq ftxvj ttqcjc qhjqq cpnz (contains eggs, nuts, sesame)",
    "stj crpp trs ffv lkbgv rrkjkz msld plrlg lpzgzmk mkvzps ttfctr dbsm tplc vbjknl rgg xfkk sjn fzcrb pnjj dtsqng ljkgrv msxdtzt jjlbpdl strzx nblt ktzvqsv xtflt zmmp vrgtc rzqxjt hsvx ppj xvt qcpc pfpd ljdjl rxrcp pprcp mnrnts hmjmsl vfmggjg tqlmf hpk mrccxm qfpshxg fgkgs nkztt rhvjh vkgh klm hfjcm lcr kbmlt jvgnc shzv qmkr fslg (contains nuts)",
    "nvgltvp gxnr nm dtsqng qfxgrl dtmrg svnkt pnjj mtdqzs zmmp xvt qjkvzrj plrlg fslg qmkr hghkj jghzkx jlh lzs qcpc sjn kbmlt nsgvx crpp xgtl bckqmz xpjcnq xhblgds lpzgzmk rrkjkz hfjcm gvzkz msld zchs mrccxm nhvl lktpx hrmbv vrjs smthrb fgkgs lpkbnb mzjgp ppj mnrnts hsvx rsc vpsq rzqxjt bmqft zzgdb msxdtzt jvgnc (contains wheat)",
    "vpsq bbpcgfr qlbvk jrczjdvh ksnnt jghzkx mrccxm zjdkf njcpxn nnghzx jjtc tnjtdf fltk xhcbk pnjj hghkj lpbsvq tpxr msld qjkvzrj mxxnn dxrj rkpnsv msxdtzt hbqvgsc zzrc xvgj kzzcg mgdkfn zmmp bvnxkx vdghdc xfkk stj mmbdpl zxzsp zmjgh bdds zchs dbsm ttfctr kbmlt xpjcnq ppj plrlg fcdxphc fqhhh jvgnc gxnr rhvjh vrgtc gvzkz zlvdgnq lfxnqb vkgh xhblgds mkvzps lcr jjlbpdl bhl zgrvqc ffv clt (contains eggs, shellfish)",
    "ppj mxxnn nblt pfpd sfflvrf lktpx fzcrb shzv xhblgds mbvdr jghzkx mqnlsk nnghzx jvgnc nqmpbj plrlg mkvzps bdds rxrcp nhvl hghkj ffv zzrc xpjcnq xlpnhzk xvgj mrccxm ldpl kkfnhr pkrfq bckqmz ghspr snjq gxnr tpxr vkgh bvnxkx zcl zgrvqc fqhhh rhvjh dtsqng vlmppdhn zqp cpnz gxjv pnjj ljkgrv vfmggjg hpk xdjtdmxs ngrkp drnhfq kbmlt vlrrm gssmcm lnxcm rzqxjt btz mrnzdb jrczjdvh zxrbz jlh xtqs rtl rgg tdrh tnjtdf nvgltvp hshx dshk qlbvk lpzgzmk njcpxn hbqvgsc xgtl svnkt gvzkz mtdqzs (contains nuts, peanuts, fish)",
    "ghspr lcr mrnzdb sqkbn drnhfq vrjs htrp jjtc gssmcm vlmppdhn ppj xvt xgtl vjngxs kbmlt ksnnt qfpshxg rkpnsv zdsfp ldpl zgrvqc lpzgzmk mljm stj mrccxm klm clt xvgj mxxnn strzx fcdxphc ngrkp tplc jvgnc pccg plrlg rtl mnrnts nblt mkvzps zdgxsxg dtmrg (contains fish, shellfish)",
    "jjlbpdl rcgc ppj ftxvj dshk jvgnc zmjgh rhvjh fslg njcpxn nhvl sjn lpzgzmk cpmqmd mnrnts bfnkf msld ghspr gxnr tnjtdf fcdxphc qhjqq nfgv lstszk tplc btz kbmlt fqhhh hlhpq vjngxs zchs mrnzdb xlpnhzk ttqcjc gxjv hsvx bckqmz dtsqng drnhfq zmmp ztxrfc nglg lfxnqb stj jjtc xvt vfmggjg nnghzx qlbvk mljm vlrrm rsc lpkbnb jghzkx plrlg vrjs fltk vlmppdhn trs (contains nuts, shellfish, wheat)",
    "xtqs bmqft kkfnhr ppj lstszk vqnzjk lpkbnb jlh clt zcl pnjj xlpnhzk hfjcm stj xpjcnq zlkcs dshk vlmppdhn lktpx mtdqzs tbns nfgv hlhpq vdghdc rkpnsv mzjgp fqhhh ztxrfc dglrks hrmbv ffv ljdjl rtl qxcbdq ljkgrv msld fslg pmg fcdxphc ngrkp bnqvfg nvdnp vrjs jvgnc xtflt zmjgh rxrsz qfxgrl crpp dtmrg kbmlt nglg rcgc ghspr mrccxm lnxcm blkl bbpcgfr ttqcjc lpzgzmk rxrcp gxnr tpxr (contains peanuts, shellfish, sesame)",
    "zmjgh zlvdgnq tqlmf ksnnt hfjcm mrccxm rtl lstszk fbplkn lfxnqb nfgv rzqxjt zfb bnqvfg vdghdc hpk qfpshxg rxrcp xqxjmh ttfctr zxrbz pmg plrlg kzzcg vqnzjk zcl ppj zzgdb kkfnhr nsgvx ljdjl qcpc ftxvj xfkk gxnr lpbsvq qhjqq lpzgzmk mgdkfn hlhpq nblt vdklml pfpd fcdxphc bprncs xdjtdmxs clt nnghzx jvgnc stj msld ffv nm hbqvgsc zzrc rxrsz xlpnhzk xhcbk jjtc htrp rcgc pnjj hmlx kq fzcrb hshx vbjknl lzs nvdnp dhlsfm lktpx (contains shellfish, peanuts)",
    "mqnlsk zgrvqc zqp strzx ffv gtbzks smthrb pxxh pcfgsc nsgvx mxxnn zzrc jjtc ljkgrv gssmcm fgkgs qjkvzrj dtsqng vlmppdhn tplc zzgdb qmkr dbgtk bnqvfg tnjtdf hfjcm hghkj nfgv qhjqq jjlbpdl xpjcnq gxnr gxjv xdjtdmxs mgdkfn zjdkf jrczjdvh zchs mrccxm clt qfllqzq zxrbz vdghdc nqmpbj lpzgzmk mzjgp xgtl ppj nkztt rhdh ksnnt hshx xhblgds ttqcjc zlvdgnq jvgnc qfpshxg plrlg rkpnsv vmcczg nblt nnghzx lfxnqb jlh ngrkp zlkcs kbmlt (contains soy, shellfish, nuts)",
    "jvgnc vjngxs smthrb plrlg pfpd crpp fzcrb rzqxjt fslg vmcczg strzx bdds fltk qfpshxg mbvdr gjmmvlx mkvzps qfllqzq zxrbz bhl xtqs mljm xvt pkrfq bprncs xhcbk hpk rxrsz zjdkf vdklml ppj nvdnp klm kkfnhr gxnr dbgtk qlbvk ttfctr pnjj lpzgzmk zlvdgnq dtmrg dglrks mqnlsk htrp xhblgds ldpl lzs kbmlt mrccxm ljkgrv vdghdc hrmg vrjs (contains peanuts, wheat, nuts)",
    "hkx jvgnc fbplkn ffv xlpnhzk mbvdr lpbsvq vbjknl pmg jlh xhcbk dhlsfm rzqxjt nvgltvp vlrrm ztxrfc rrkjkz gjmmvlx nnghzx nsgvx vdklml vpsq kq rcgc lpzgzmk strzx kbmlt bfnkf qmkr ttqcjc ljkgrv bhl rhdh nkztt stj zjdkf dglrks hlhpq rxrsz mrccxm pkrfq vrgtc mnrnts pvlznp blkl xvt hmlx plrlg zdgxsxg qjkvzrj fslg gxnr dxrj (contains soy, shellfish, eggs)",
    "pxxh mkvzps njcpxn nqmpbj sfflvrf mrccxm rxrsz dglrks gxnr tnjtdf ktzvqsv rrkjkz xqxjmh mqnlsk kzzcg zchs mtdqzs kbmlt bckqmz vrjs pvlznp mljm smthrb lzs zgrvqc lcr nblt ppj pccg vbjknl ksnnt qmkr qlbvk xtflt mrnzdb vlmppdhn jvgnc ttqcjc xdjtdmxs xhblgds hrmbv hkx pfpd mzjgp xfkk lfxnqb hbqvgsc lktpx fbplkn lpkbnb msxdtzt zdsfp vdklml ngrkp stj mnrnts zlkcs svnkt rhdh nkztt xlpnhzk lnxcm htrp ztxrfc jlh rzqxjt bnqvfg qfxgrl nvgltvp tbns qjkvzrj rqkzqhm crpp zqp strzx mxxnn jrczjdvh dxrj jjlbpdl rtl blkl zdgxsxg sqkbn gtbzks zlvdgnq vqnzjk nfgv mbvdr gxjv fzcrb lpzgzmk lstszk (contains eggs, soy)",
    "hmlx xvgj dtsqng nsgvx ghspr vlmppdhn mrccxm stj qjkvzrj ppj pmg zqp hghkj bfnkf kzzcg njcpxn mbvdr rgg svnkt hrmg vmcczg pprcp bhl rhvjh bdds qxcbdq zjdkf dbsm zxrbz plrlg lktpx lkbgv rsc vjngxs xlpnhzk vfmggjg tdrh lpzgzmk mljm qhjqq gxnr nvgltvp xvt mnrnts nblt jvgnc nnghzx msxdtzt fslg (contains sesame, shellfish)",
    "ttqcjc mtdqzs fbplkn btz xtflt kbmlt mnrnts lpzgzmk ljdjl ktzvqsv msxdtzt cpnz lfxnqb xvgj sqkbn rtl vkgh zdgxsxg qfpshxg pmg bnqvfg lpkbnb jnqvv xlpnhzk lktpx vfmggjg plrlg rhvjh jvgnc bckqmz htrp mkvzps zxzsp nfgv mrccxm fqhhh rxrsz sfflvrf cpmqmd gxnr lpbsvq drnhfq ttfctr vbjknl ffv trs fzcrb stj ljkgrv (contains sesame)",
    "smthrb lcr nhvl rsc hmjmsl mgdkfn xpjcnq ftxvj vlmppdhn kbmlt hlhpq zcl trs lpzgzmk ffv zfb clt jjlbpdl lstszk tdrh jvgnc zzrc qxcbdq nfgv dxrj sfflvrf gssmcm mqnlsk gjmmvlx dglrks mljm vkgh strzx qfllqzq zchs plrlg lkbgv hghkj njcpxn lnxcm stj dbgtk jjtc xtflt mzjgp bnqvfg qcpc dbsm fzcrb xhblgds blkl zlvdgnq mkvzps mxxnn mrccxm rkpnsv nblt lzs gxjv fbplkn fqhhh rhvjh xvgj msld svnkt drnhfq cpnz rzqxjt rgg xhcbk klm vdklml qhjqq btz qfpshxg jghzkx xtqs shzv nvgltvp gxnr vfmggjg bprncs nsgvx (contains shellfish, wheat, nuts)"
  ]
);
