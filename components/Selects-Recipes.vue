<script setup lang="ts">
const maxCalories = useState("maxCalories");
const selectedDiet = useState("selectedDiet");
const selectedHealth = useState("selectedHealth");
const selectedMealType = useState("selectedMealType");
const selectedDishType = useState("selectedDishType");
const cuisineType = useState("cuisineType");
</script>

<template>
	<div class="mb-8 flex justify-between bg-lime-500 text-sm">
		<input
			type="text"
			id="calories"
			v-model="maxCalories"
			class="input-topBar"
			:placeholder="$t('filters.maxCalories')"
		/>

		<div class="flex flex-col items-center">
			<select id="dishType" v-model="selectedDishType" class="input-topBar">
				<option value="">{{ $t("filters.dishType") }}</option>
				<option value="">{{ $t("common.all") }}</option>
				<option value="drinks">{{ $t("filters.dish.drinks") }}</option>
				<option value="sweets">{{ $t("filters.dish.sweets") }}</option>
				<option value="biscuits and cookies">
					{{ $t("filters.dish.biscuits") }}
				</option>
				<option value="condiments and sauces">
					{{ $t("filters.dish.condiments") }}
				</option>
				<option value="sandwiches">{{ $t("filters.dish.sandwiches") }}</option>
				<option value="starter">{{ $t("filters.dish.starter") }}</option>
				<option value="main course">{{ $t("filters.dish.mainCourse") }}</option>
				<option value="side dish">{{ $t("filters.dish.sideDish") }}</option>
				<option value="desserts">{{ $t("filters.dish.desserts") }}</option>
				<option value="special occasions">
					{{ $t("filters.dish.specialOccasions") }}
				</option>
			</select>
		</div>

		<div class="flex flex-col items-center">
			<select id="cuisineType" v-model="cuisineType" class="input-topBar">
				<option value="">{{ $t("filters.cuisine") }}</option>
				<option value="">{{ $t("common.all") }}</option>
				<option value="american">{{ $t("filters.cuisineOptions.american") }}</option>
				<option value="asian">{{ $t("filters.cuisineOptions.asian") }}</option>
				<option value="british">{{ $t("filters.cuisineOptions.british") }}</option>
				<option value="caribbean">
					{{ $t("filters.cuisineOptions.caribbean") }}
				</option>
				<option value="central europe">
					{{ $t("filters.cuisineOptions.centralEurope") }}
				</option>
				<option value="chinese">{{ $t("filters.cuisineOptions.chinese") }}</option>
				<option value="eastern europe">
					{{ $t("filters.cuisineOptions.easternEurope") }}
				</option>
				<option value="french">{{ $t("filters.cuisineOptions.french") }}</option>
				<option value="greek">{{ $t("filters.cuisineOptions.greek") }}</option>
				<option value="indian">{{ $t("filters.cuisineOptions.indian") }}</option>
				<option value="italian">{{ $t("filters.cuisineOptions.italian") }}</option>
				<option value="japanese">
					{{ $t("filters.cuisineOptions.japanese") }}
				</option>
				<option value="korean">{{ $t("filters.cuisineOptions.korean") }}</option>
				<option value="mediterranean">
					{{ $t("filters.cuisineOptions.mediterranean") }}
				</option>
				<option value="mexican">{{ $t("filters.cuisineOptions.mexican") }}</option>
				<option value="middle eastern">
					{{ $t("filters.cuisineOptions.middleEastern") }}
				</option>
				<option value="nordic">{{ $t("filters.cuisineOptions.nordic") }}</option>
				<option value="south american">
					{{ $t("filters.cuisineOptions.southAmerican") }}
				</option>
				<option value="south east asian">
					{{ $t("filters.cuisineOptions.southEastAsian") }}
				</option>
			</select>
		</div>
		<div class="flex flex-col items-center">
			<select id="diet" v-model="selectedDiet" class="input-topBar">
				<option value="">{{ $t("filters.dietType") }}</option>
				<option value="">{{ $t("common.all") }}</option>
				<option value="Balanced">{{ $t("filters.diet.balanced") }}</option>
				<option value="High-Fiber">{{ $t("filters.diet.highFiber") }}</option>
				<option value="High-Protein">
					{{ $t("filters.diet.highProtein") }}
				</option>
				<option value="Low-Carb">{{ $t("filters.diet.lowCarb") }}</option>
				<option value="Low-Fat">{{ $t("filters.diet.lowFat") }}</option>
				<option value="Low-Sodium">{{ $t("filters.diet.lowSodium") }}</option>
			</select>
		</div>

		<div class="flex flex-col items-center text-xs">
			<select id="health" v-model="selectedHealth" class="input-topBar">
				<option value="">{{ $t("filters.healthRestrictions") }}</option>
				<option value="">{{ $t("filters.none") }}</option>
				<option value="Sugar-Concious">
					{{ $t("filters.health.sugarConscious") }}
				</option>
				<option value="Egg-free">{{ $t("filters.health.eggFree") }}</option>
				<option value="Vegetarian">
					{{ $t("filters.health.vegetarian") }}
				</option>
				<option value="Mediterranean">
					{{ $t("filters.health.mediterranean") }}
				</option>
				<option value="Dayry-Free">{{ $t("filters.health.dairyFree") }}</option>
				<option value="Gluten-Free">
					{{ $t("filters.health.glutenFree") }}
				</option>
				<option value="Wheat-Free">{{ $t("filters.health.wheatFree") }}</option>
				<option value="Peanut-Free">
					{{ $t("filters.health.peanutFree") }}
				</option>
				<option value="Tree-Nut-Free">
					{{ $t("filters.health.treeNutFree") }}
				</option>
				<option value="Soy-Free">{{ $t("filters.health.soyFree") }}</option>
				<option value="Fish-Free">{{ $t("filters.health.fishFree") }}</option>
				<option value="Shellfish-Free">
					{{ $t("filters.health.shellfishFree") }}
				</option>
				<option value="Pork-Free">{{ $t("filters.health.porkFree") }}</option>
				<option value="Red-Meat-Free">
					{{ $t("filters.health.redMeatFree") }}
				</option>
				<option value="Crustacean-Free">
					{{ $t("filters.health.crustaceanFree") }}
				</option>
				<option value="Celery-Free">
					{{ $t("filters.health.celeryFree") }}
				</option>
				<option value="Mustard-Free">
					{{ $t("filters.health.mustardFree") }}
				</option>
				<option value="Sesame-Free">
					{{ $t("filters.health.sesameFree") }}
				</option>
				<option value="Lupin-Free">{{ $t("filters.health.lupinFree") }}</option>
				<option value="Mollusk-Free">
					{{ $t("filters.health.molluskFree") }}
				</option>
				<option value="Alcohol-Free">
					{{ $t("filters.health.alcoholFree") }}
				</option>
				<option value="Sulfite-Free">
					{{ $t("filters.health.sulfiteFree") }}
				</option>
				<option value="Kosher">{{ $t("filters.health.kosher") }}</option>
				<option value="Immuno-Supportive">
					{{ $t("filters.health.immunoSupportive") }}
				</option>
			</select>
		</div>

		<div class="flex flex-col items-center text-xs">
			<select id="mealType" v-model="selectedMealType" class="input-topBar">
				<option value="">{{ $t("filters.mealType") }}</option>
				<option value="">{{ $t("common.all") }}</option>
				<option value="breakfast">{{ $t("filters.meal.breakfast") }}</option>
				<option value="brunch">{{ $t("filters.meal.brunch") }}</option>
				<option value="lunch/dinner">
					{{ $t("filters.meal.lunchDinner") }}
				</option>
				<option value="snack">{{ $t("filters.meal.snack") }}</option>
				<option value="teatime">{{ $t("filters.meal.teatime") }}</option>
			</select>
		</div>
	</div>
</template>
