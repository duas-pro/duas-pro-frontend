<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Slider } from '$lib/components/ui/slider';
	import { duaStore } from '$lib/stores/dua';
	import { Play, Pause, SkipBack, SkipForward, Bookmark } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let totalVerses: number;

	interface AudioData {
		audioId: string;
		reciter: {
			reciterId: number;
			reciterName: {
				tl: string;
				ar: string;
			};
		};
		duration: number;
		quality: number;
		approvedState: number;
		slideTiming: { [key: string]: number };
		languages: string[];
		kbpsVersions: number[];
		urls: {
			[key: string]: string;
		};
		filesSaved: boolean;
	}

	let audioData: AudioData;
	let audio: HTMLAudioElement;
	let isPlaying = false;

	onMount(async () => {
		try {
			// const response = await fetch(
			// 	'https://www.duaplayer.org/api/audio/8f19329d-8eb0-4a19-8f22-08dbf1220740'
			// );
			// audioData = await response.json();
			audioData = JSON.parse(
				'{   "audioId": "8f19329d-8eb0-4a19-8f22-08dbf1220740",   "reciter": {     "reciterId": 2058,     "reciterName": {       "tl": "Abdul Rasul Al-Hussaini",       "ar": ""     }   },   "reciterId": 0,   "duration": 1822433,   "quality": 128,   "approvedState": 1,   "slideTiming": {     "1": 0,     "2": 23686,     "3": 36686,     "4": 45468,     "5": 51306,     "6": 57413,     "7": 67763,     "8": 76996,     "9": 85775,     "10": 94825,     "11": 104926,     "12": 116342,     "13": 123784,     "14": 133350,     "15": 140254,     "16": 145839,     "17": 151413,     "18": 160974,     "19": 170802,     "20": 181434,     "21": 190731,     "22": 200562,     "23": 216534,     "24": 225302,     "25": 231142,     "26": 239970,     "27": 244755,     "28": 249537,     "29": 268658,     "30": 283282,     "31": 293915,     "32": 300545,     "33": 306396,     "34": 315428,     "35": 322353,     "36": 329249,     "37": 337482,     "38": 345730,     "39": 351825,     "40": 362448,     "41": 367480,     "42": 372536,     "43": 378105,     "44": 384479,     "45": 394302,     "46": 398559,     "47": 403869,     "48": 411808,     "49": 416591,     "50": 423242,     "51": 431474,     "52": 435985,     "53": 441030,     "54": 445016,     "55": 449808,     "56": 455113,     "57": 469181,     "58": 486457,     "59": 496817,     "60": 506405,     "61": 514360,     "62": 520977,     "63": 528162,     "64": 537194,     "65": 543552,     "66": 559502,     "67": 572775,     "68": 579675,     "69": 588990,     "70": 599086,     "71": 604121,     "72": 611264,     "73": 620267,     "74": 626662,     "75": 639432,     "76": 644746,     "77": 650594,     "78": 655648,     "79": 661440,     "80": 668352,     "81": 678705,     "82": 691974,     "83": 700746,     "84": 705793,     "85": 712686,     "86": 727309,     "87": 738745,     "88": 746433,     "89": 755945,     "90": 763125,     "91": 770323,     "92": 776709,     "93": 782562,     "94": 793199,     "95": 804313,     "96": 808841,     "97": 814427,     "98": 821830,     "99": 834320,     "100": 846000,     "101": 856886,     "102": 866756,     "103": 874714,     "104": 886933,     "105": 897253,     "106": 902038,     "107": 911333,     "108": 918510,     "109": 933865,     "110": 945214,     "111": 960359,     "112": 969928,     "113": 978431,     "114": 985341,     "115": 994880,     "116": 1001795,     "117": 1006580,     "118": 1011086,     "119": 1016135,     "120": 1021456,     "121": 1028626,     "122": 1035262,     "123": 1043773,     "124": 1058156,     "125": 1062928,     "126": 1068777,     "127": 1074104,     "128": 1084202,     "129": 1095616,     "130": 1107291,     "131": 1113403,     "132": 1120050,     "133": 1127743,     "134": 1133073,     "135": 1139975,     "136": 1145032,     "137": 1148475,     "138": 1159632,     "139": 1163351,     "140": 1168405,     "141": 1174778,     "142": 1180625,     "143": 1185937,     "144": 1190977,     "145": 1203242,     "146": 1212539,     "147": 1222894,     "148": 1232192,     "149": 1240961,     "150": 1251055,     "151": 1259290,     "152": 1265631,     "153": 1271762,     "154": 1282920,     "155": 1293518,     "156": 1298568,     "157": 1306509,     "158": 1314494,     "159": 1324582,     "160": 1329893,     "161": 1335487,     "162": 1346364,     "163": 1355387,     "164": 1366017,     "165": 1376390,     "166": 1383574,     "167": 1388344,     "168": 1393662,     "169": 1399231,     "170": 1404553,     "171": 1408821,     "172": 1413059,     "173": 1421573,     "174": 1428210,     "175": 1435383,     "176": 1440697,     "177": 1445217,     "178": 1449461,     "179": 1452646,     "180": 1461408,     "181": 1465918,     "182": 1469917,     "183": 1474429,     "184": 1478678,     "185": 1482932,     "186": 1490362,     "187": 1500988,     "188": 1506034,     "189": 1511883,     "190": 1517730,     "191": 1525158,     "192": 1529683,     "193": 1534193,     "194": 1544034,     "195": 1548283,     "196": 1554400,     "197": 1564494,     "198": 1569271,     "199": 1576176,     "200": 1582545,     "201": 1590256,     "202": 1594506,     "203": 1599560,     "204": 1603542,     "205": 1608057,     "206": 1614701,     "207": 1618959,     "208": 1624503,     "209": 1631142,     "210": 1636987,     "211": 1641770,     "212": 1648423,     "213": 1652127,     "214": 1658780,     "215": 1662766,     "216": 1666215,     "217": 1672316,     "218": 1674969,     "219": 1679228,     "220": 1682417,     "221": 1688025,     "222": 1694136,     "223": 1698122,     "224": 1701312,     "225": 1705826,     "226": 1712724,     "227": 1716711,     "228": 1720174,     "229": 1727867,     "230": 1735588,     "231": 1741166,     "232": 1743782,     "233": 1748303,     "234": 1754721,     "235": 1760808,     "236": 1766122,     "237": 1769804,     "238": 1773227,     "239": 1776418,     "240": 1779072,     "241": 1784383,     "242": 1787037,     "243": 1789699,     "244": 1792354,     "245": 1796866,     "246": 1800068,     "247": 1804041,     "248": 1807778,     "249": 1814954,     "250": 1821860   },   "languages": [     "ar"   ],   "kbpsVersions": [     128,     64   ],   "urls": {     "64": "https://duaplayer-dev.s3.amazonaws.com/audios/dua-kumayl-8f19329d-8eb0-4a19-8f22-08dbf1220740-$64kbps.mp3?AWSAccessKeyId=AKIAIOFB57T33ZQMCYFQ&Expires=1720353851&Signature=4P3sTeAQPj81HOLa%2F%2BIy3oNwiZA%3D",     "128": "https://duaplayer-dev.s3.amazonaws.com/audios/dua-kumayl-8f19329d-8eb0-4a19-8f22-08dbf1220740-$128kbps.mp3?AWSAccessKeyId=AKIAIOFB57T33ZQMCYFQ&Expires=1720353851&Signature=de45FAbuHEncluXVbq0L%2Bvc5llA%3D"   },   "filesSaved": true }'
			);
			console.log('audioData: ', audioData);
			// totalVerses = Object.keys(audioData.slideTiming).length;
			audio = new Audio(
				'https://duaplayer-dev.s3.amazonaws.com/audios/dua-kumayl-8f19329d-8eb0-4a19-8f22-08dbf1220740-$128kbps.mp3?AWSAccessKeyId=AKIAIOFB57T33ZQMCYFQ&Expires=1720353851&Signature=de45FAbuHEncluXVbq0L%2Bvc5llA%3D'
			); // Höhere Qualität
			audio.addEventListener('timeupdate', updateProgress);
			audio.addEventListener('ended', () => {
				isPlaying = false;
			});
		} catch (error) {
			console.error('Failed to fetch audio data:', error);
		}
	});

	function togglePlay() {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		isPlaying = !isPlaying;
	}

	function previousVerse() {
		if ($duaStore.currentVerse > 0) {
			duaStore.update((state) => ({ ...state, currentVerse: state.currentVerse - 1 }));
			seekToVerse($duaStore.currentVerse);
		}
	}

	function nextVerse() {
		if ($duaStore.currentVerse < totalVerses - 1) {
			duaStore.update((state) => ({ ...state, currentVerse: state.currentVerse + 1 }));
			seekToVerse($duaStore.currentVerse);
		}
	}

	function handleSliderChange(value: number[]) {
		const newVerseIndex = value[0];
		duaStore.update((state) => ({ ...state, currentVerse: newVerseIndex }));
		seekToVerse(newVerseIndex);
	}

	function updateProgress() {
		const currentTime = audio.currentTime * 1000; // Convert to milliseconds
		for (let i = totalVerses; i >= 1; i--) {
			if (currentTime >= audioData.slideTiming[i]) {
				duaStore.update((state) => ({ ...state, currentVerse: i - 1 }));
				break;
			}
		}
	}

	function seekToVerse(verseIndex: number) {
		if (audioData) {
			audio.currentTime = audioData.slideTiming[verseIndex + 1] / 1000; // Convert to seconds
		}
	}
</script>

<div class="audio-player fixed bottom-0 left-0 right-0 border-t border-border bg-background">
	<div class="mx-auto max-w-5xl">
		<Slider
			onValueChange={handleSliderChange}
			value={[$duaStore.currentVerse]}
			max={totalVerses - 1}
			step={1}
			class="w-full"
		/>
		<div class="flex items-center justify-center space-x-4 p-4">
			<Button variant="ghost" on:click={previousVerse}>
				<SkipBack class="h-6 w-6" />
			</Button>
			<Button variant="ghost" on:click={togglePlay}>
				{#if isPlaying}
					<Pause class="h-6 w-6" />
				{:else}
					<Play class="h-6 w-6" />
				{/if}
			</Button>
			<Button variant="ghost" on:click={nextVerse}>
				<SkipForward class="h-6 w-6" />
			</Button>
		</div>
	</div>
</div>
