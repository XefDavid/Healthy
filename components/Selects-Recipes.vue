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
			placeholder="Max calories.."
		/>

		<div class="flex flex-col items-center">
			<select id="dishType" v-model="selectedDishType" class="input-topBar">
				<option value="">Dish type</option>
				<option value="">All</option>
				<option value="drinks">Drinks</option>
				<option value="sweets">Sweets</option>
				<option value="biscuits and cookies">Biscuits</option>
				<option value="condiments and sauces">Condiments and sauces</option>
				<option value="sandwiches">Sandwiches</option>
				<option value="starter">Starter</option>
				<option value="main course">Main course</option>
				<option value="side dish">Side Dish</option>
				<option value="desserts">Desserts</option>
				<option value="special occasions">Special ocassions</option>
			</select>
		</div>

		<div class="flex flex-col items-center">
			<select id="cuisineType" v-model="cuisineType" class="input-topBar">
				<option value="">Cuisine</option>
				<option value="">All</option>
				<option value="american">American</option>
				<option value="asian">Asian</option>
				<option value="british">British</option>
				<option value="caribbean">Caribbean</option>
				<option value="central europe">Central Europe</option>
				<option value="chinese">Chinese</option>
				<option value="eastern europe">Eastern Europe</option>
				<option value="french">French</option>
				<option value="greek">Greek</option>
				<option value="indian">Indian</option>
				<option value="italian">Italian</option>
				<option value="japanese">Japanese</option>
				<option value="korean">Korean</option>
				<option value="mediterranean">Mediterranean</option>
				<option value="mexican">Mexican</option>
				<option value="middle eastern">Middle Eastern</option>
				<option value="nordic">Nordic</option>
				<option value="south american">South American</option>
				<option value="south east asian">South East Asian</option>
			</select>
		</div>
		<div class="flex flex-col items-center">
			<select id="diet" v-model="selectedDiet" class="input-topBar">
				<option value="">Type of diet</option>
				<option value="">All</option>
				<option value="Balanced">Balanced</option>
				<option value="High-Fiber">High-Fiber</option>
				<option value="High-Protein">High-Protein</option>
				<option value="Low-Carb">Low-Carb</option>
				<option value="Low-Fat">Low-Fat</option>
				<option value="Low-Sodium">Low-Sodium</option>
			</select>
		</div>

		<div class="flex flex-col items-center text-xs">
			<select id="health" v-model="selectedHealth" class="input-topBar">
				<option value="">Health restrictions</option>
				<option value="">None</option>
				<option value="Sugar-Concious">Sugar concious</option>
				<option value="Egg-free">Egg-Free</option>
				<option value="Vegetarian">Vegetarian</option>
				<option value="Mediterranean">Mediterranean</option>
				<option value="Dayry-Free">Dayry-Free</option>
				<option value="Gluten-Free">Gluten-Free</option>
				<option value="Wheat-Free">Wheat-Free</option>
				<option value="Peanut-Free">Peanut-Free></option>
				<option value="Tree-Nut-Free">Tree-Nut-Free</option>
				<option value="Soy-Free">Soy-Free</option>
				<option value="Fish-Free">Fish-Free</option>
				<option value="Shellfish-Free"></option>
				<option value="Pork-Free">Pork-Free</option>
				<option value="Red-Meat-Free">Red-Meat-Free</option>
				<option value="Crustacean-Free">Crustacean-Free</option>
				<option value="Celery-Free">Celery-Free</option>
				<option value="Mustard-Free">Mustard-Free</option>
				<option value="Sesame-Free">Sesame-Free</option>
				<option value="Lupin-Free">Lupin-Free</option>
				<option value="Mollusk-Free">Mollusk-Free</option>
				<option value="Alcohol-Free">Alcohol-Free</option>
				<option value="Sulfite-Free">Sulfite-Free</option>
				<option value="Kosher">Kosher</option>
				<option value="Immuno-Supportive">Immuno-Supportive</option>
			</select>
		</div>

		<div class="flex flex-col items-center text-xs">
			<select id="mealType" v-model="selectedMealType" class="input-topBar">
				<option value="">Type of meal</option>
				<option value="">All</option>
				<option value="breakfast">Breakfast</option>
				<option value="brunch">Brunch</option>
				<option value="lunch/dinner">lunch/Dinner</option>
				<option value="snack">Snack</option>
				<option value="teatime">Teatime</option>
			</select>
		</div>
	</div>
</template>
